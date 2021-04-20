import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];

            const isCustomAuth = token.length < 500;

            let decodedData;

            if (token && isCustomAuth) {
                decodedData = jwt.verify(token, 'MEmemories');

                req.userId = decodedData?.id;
            } else {
                decodedData = jwt.decode(token);

                req.userId = decodedData?.sub;

            }
        } else {
            res.status(404).json({ message: 'Unauthorized access!' });
            return;
        }

        next();
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
        return;
    }
}

export default auth;