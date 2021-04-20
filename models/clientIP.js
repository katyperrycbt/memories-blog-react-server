import mongoose from 'mongoose';

const IPSchema = mongoose.Schema({
    ips: {
        type: Array,
        default: []
    }
});

const ClientIP = mongoose.model('ClientIP', IPSchema);

export default ClientIP;