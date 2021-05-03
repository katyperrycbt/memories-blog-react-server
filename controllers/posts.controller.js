import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Oops from '../models/oops.js';
import User from '../models/user.js';
import Comments from '../models/comments.js';
import Subcribe from '../models/subcribe.js';
import CryptoJS from 'crypto-js';

import mailgun from 'mailgun-js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

String.prototype.splice = function (idx, rem, str) {
    return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const emailData = {
    from: 'MEmories <no-reply@oopsmemories.site>',
    to: '',
    subject: '',
    html: ''
}


const newTemplate = (postTitle, postPhoto, postContent, code) => {
    return `
    <!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml">

<head>
    <!--[if gte mso 9]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta content="width=device-width" name="viewport" />
    <!--[if !mso]><!-->
    <meta content="IE=edge" http-equiv="X-UA-Compatible" />
    <!--<![endif]-->
    <title></title>
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css" />
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css" />
    <!--<![endif]-->
    <style type="text/css">
        body {
            margin: 0;
            padding: 0;
        }

        table,
        td,
        tr {
            vertical-align: top;
            border-collapse: collapse;
        }

        * {
            line-height: inherit;
        }

        a[x-apple-data-detectors=true] {
            color: inherit !important;
            text-decoration: none !important;
        }
    </style>
    <style id="media-query" type="text/css">
        @media (max-width: 620px) {

            .block-grid,
            .col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
            }

            .block-grid {
                width: 100% !important;
            }

            .col {
                width: 100% !important;
            }

            .col_cont {
                margin: 0 auto;
            }

            img.fullwidth,
            img.fullwidthOnMobile {
                max-width: 100% !important;
            }

            .no-stack .col {
                min-width: 0 !important;
                display: table-cell !important;
            }

            .no-stack.two-up .col {
                width: 50% !important;
            }

            .no-stack .col.num2 {
                width: 16.6% !important;
            }

            .no-stack .col.num3 {
                width: 25% !important;
            }

            .no-stack .col.num4 {
                width: 33% !important;
            }

            .no-stack .col.num5 {
                width: 41.6% !important;
            }

            .no-stack .col.num6 {
                width: 50% !important;
            }

            .no-stack .col.num7 {
                width: 58.3% !important;
            }

            .no-stack .col.num8 {
                width: 66.6% !important;
            }

            .no-stack .col.num9 {
                width: 75% !important;
            }

            .no-stack .col.num10 {
                width: 83.3% !important;
            }

            .video-block {
                max-width: none !important;
            }

            .mobile_hide {
                min-height: 0px;
                max-height: 0px;
                max-width: 0px;
                display: none;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide {
                display: block !important;
                max-height: none !important;
            }
        }
    </style>
    <style id="icon-media-query" type="text/css">
        @media (max-width: 620px) {
            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }
        }
    </style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #FFFFFF;">
    <!--[if IE]><div class="ie-browser"><![endif]-->
    <table bgcolor="#FFFFFF" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
        style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #FFFFFF; width: 100%;"
        valign="top" width="100%">
        <tbody>
            <tr style="vertical-align: top;" valign="top">
                <td style="word-break: break-word; vertical-align: top;" valign="top">
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#FFFFFF"><![endif]-->
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #7ed1cb;">
                            <div
                                style="border-collapse: collapse;display: table;width: 100%;background-color:#7ed1cb;background-image:url('images/Waffle_day_bg.png');background-position:top left;background-repeat:no-repeat">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#7ed1cb"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#7ed1cb;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center fixedwidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                <div style="font-size:1px;line-height:30px"> </div><img align="center"
                                                    alt="Cover" border="0" class="center fixedwidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1618987296/photo_fyxf36.png"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 120px; display: block;"
                                                    title="MEmories" width="120" />
                                                <div style="font-size:1px;line-height:25px"> </div>
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 20px; padding-right: 20px; padding-top: 0px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#ffffff;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:36px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;">
                                                            All our dreams can come true, if we have the courage to
                                                            pursue them.</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top: 15px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="center" class="img-container center autowidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
                                                <div style="font-size:1px;line-height:15px"> </div><img align="center"
                                                    alt="Imgs." border="0"
                                                    class="center autowidth"
                                                    src="${postPhoto}"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 600px; display: block;"
                                                    title="Img" width="600" />
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:40px; padding-bottom:30px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:40px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
                                            <!--<![endif]-->
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 00px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:28px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;">
                                                            ${postTitle}
                                                        </h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">${postContent}</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="center" class="button-container"
                                                style="padding-top:15px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 15px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:199.5pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ff7f61"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://oopsmemories.site/"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ffffff; background-color: #ff7f61; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Check
                                                            out now</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ffffff;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:30px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:30px; padding-right: 0px; padding-left: 0px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center fixedwidth">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="" align="center"><![endif]--><img
                                                    align="center" alt="A gif with different fruits falling" border="0"
                                                    class="center fixedwidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1618993134/ezgif.com-gif-maker_yvegnk.gif"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 600px; display: block;"
                                                    title="A gif with different fruits falling" width="600" />
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 30px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:28px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:center;margin-top:0;margin-bottom:0;">
                                                            Oops, Oops, OOPS!</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: center; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">This is one of my great friends
                                                            (I'm Katyperrycbt)<br />
                                                            <i>'A sweet friendship refreshes the soul.'</i>
                                                        </span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid three-up"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ffffff;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ffffff;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="200" style="background-color:#ffffff;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:20px;"><![endif]-->
                                <div class="col num4"
                                    style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 150px; width: 150px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:20px; padding-right: 5px; padding-left: 5px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center autowidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                                    align="center" alt="Img" border="0" class="center autowidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1616466280/ikcey9q3kvhlijproot8.jpg"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 190px; display: block;"
                                                    title="img" width="190" />
                                                <div style="font-size:1px;line-height:00px"> </div>
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 10px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:18px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:left;margin-top:0;margin-bottom:0;">
                                                            A multi-talented friend, especially talented in dancing and
                                                            singing!<br /></h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">Being a student, and already have
                                                            a partner</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="left" class="button-container"
                                                style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:108.75pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ff7f61; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://www.facebook.com/phuclong6996"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ff7f61; background-color: transparent; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:0px;padding-right:20px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Sweeten
                                                            Up  &gt;</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#ffffff;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                <div class="col num4"
                                    style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 150px; width: 150px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center autowidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                                    align="center" alt="Img" border="0" class="center autowidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1617207639/kdfst0izb8di6yqfapqn.jpg"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 190px; display: block;"
                                                    title="Img" width="190" />
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 10px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:18px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:left;margin-top:0;margin-bottom:0;">
                                                            A beautiful, sly, and humorous girl!</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">Currently, she is single and hate
                                                            discrimination!</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="left" class="button-container"
                                                style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:111.75pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ff7f61; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://www.facebook.com/Bobie.1708"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ff7f61; background-color: transparent; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:0px;padding-right:0px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Beautiful! 
                                                            &gt;</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td><td align="center" width="200" style="background-color:#ffffff;width:200px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                                <div class="col num4"
                                    style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 150px; width: 150px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center autowidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                                    align="center" alt="Img" border="0" class="center autowidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1617868427/zimm4swpho5x9gabheln.jpg"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 190px; display: block;"
                                                    title="img" width="190" />
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 10px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:18px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:left;margin-top:0;margin-bottom:0;">
                                                            This young doctor to-be is talented, sensitive and lovely,
                                                            delicate</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">Love usuk music, food and
                                                            travel!</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="left" class="button-container"
                                                style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:78pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ff7f61; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://www.facebook.com/huu.thinh.1609"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ff7f61; background-color: transparent; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:0px;padding-right:10px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Try
                                                            It Out  &gt;</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <div class="col num4"
                                    style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 150px; width: 150px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
                                            <!--<![endif]-->
                                            <div align="center" class="img-container center autowidth"
                                                style="padding-right: 0px;padding-left: 0px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
                                                    align="center" alt="Img" border="0" class="center autowidth"
                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1618995575/136711306_1365373750472403_5510569137691607947_n_i3vjwn.jpg"
                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 190px; display: block;"
                                                    title="img" width="190" />
                                                <!--[if mso]></td></tr></table><![endif]-->
                                            </div>
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 10px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#396a78;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:18px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:left;margin-top:0;margin-bottom:0;">
                                                            Kind and helpful roommate</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#a0a0a0;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #a0a0a0; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 16px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 19px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 16px;">Addicted to Japanese cartoons, wibu lord!</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="left" class="button-container"
                                                style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:78pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fill="false"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ff7f61; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://www.facebook.com/profile.php?id=100009993734495"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ff7f61; background-color: transparent; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:0px;padding-right:10px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">I Am Here
                                                              &gt;</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #ff7f61;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#ff7f61;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#ff7f61"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#ff7f61;width:600px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top:60px; padding-bottom:60px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:60px; padding-bottom:60px; padding-right: 20px; padding-left: 20px;">
                                            <!--<![endif]-->
                                            <table cellpadding="0" cellspacing="0" role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tr style="vertical-align: top;" valign="top">
                                                    <td align="center"
                                                        style="word-break: break-word; vertical-align: top; padding-bottom: 0px; padding-left: 10px; padding-right: 5px; padding-top: 0px; text-align: center; width: 100%;"
                                                        valign="top" width="100%">
                                                        <h1
                                                            style="color:#f7ee83;direction:ltr;font-family:'Bitter', Georgia, Times, 'Times New Roman', serif;font-size:28px;font-weight:normal;letter-spacing:normal;line-height:120%;text-align:left;margin-top:0;margin-bottom:0;">
                                                            "If people are doubting how far you can go, go so far that
                                                            you can’t hear them anymore."<br />Michele Ruiz</h1>
                                                    </td>
                                                </tr>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, Verdana, sans-serif"><![endif]-->
                                            <div
                                                style="color:#ffffff;font-family:'Lato', Tahoma, Verdana, Segoe, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; font-family: 'Lato', Tahoma, Verdana, Segoe, sans-serif; color: #ffffff; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 20px; line-height: 1.2; word-break: break-word; text-align: left; font-family: Lato, Tahoma, Verdana, Segoe, sans-serif; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
                                                        <span style="font-size: 20px;">"We need to accept that we won’t
                                                            always make the right decisions, that we’ll screw up royally
                                                            sometimes – understanding that failure is not the opposite
                                                            of success, it’s part of success."<br />Arianna
                                                            Huffington</span></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <div align="left" class="button-container"
                                                style="padding-top:15px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
                                                <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 15px; padding-right: 10px; padding-bottom: 0px; padding-left: 10px" align="left"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="www.example.com" style="height:31.5pt;width:204pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#f7ee83"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ff7f61; font-family:Arial, sans-serif; font-size:16px"><![endif]--><a
                                                    href="https://www.oberlo.com/blog/motivational-quotes"
                                                    style="-webkit-text-size-adjust: none; text-decoration: none; display: inline-block; color: #ff7f61; background-color: #f7ee83; border-radius: 4px; -webkit-border-radius: 4px; -moz-border-radius: 4px; width: auto; width: auto; border-top: 0px solid #8a3b8f; border-right: 0px solid #8a3b8f; border-bottom: 0px solid #8a3b8f; border-left: 0px solid #8a3b8f; padding-top: 5px; padding-bottom: 5px; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; text-align: center; mso-border-alt: none; word-break: keep-all;"
                                                    target="_blank"><span
                                                        style="padding-left:40px;padding-right:40px;font-size:16px;display:inline-block;letter-spacing:undefined;"><span
                                                            style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;">Check
                                                            More Quotes</span></span></a>
                                                <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                                            </div>
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="background-color:#ecfffe;">
                        <div class="block-grid"
                            style="min-width: 320px; max-width: 600px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #7ed1cb;">
                            <div style="border-collapse: collapse;display: table;width: 100%;background-color:#7ed1cb;">
                                <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#ecfffe;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px"><tr class="layout-full-width" style="background-color:#7ed1cb"><![endif]-->
                                <!--[if (mso)|(IE)]><td align="center" width="600" style="background-color:#7ed1cb;width:600px; border-top: 0px solid #D4F9EF; border-left: 0px solid #D4F9EF; border-bottom: 0px solid #D4F9EF; border-right: 0px solid #D4F9EF;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 25px; padding-left: 25px; padding-top:25px; padding-bottom:25px;"><![endif]-->
                                <div class="col num12"
                                    style="min-width: 320px; max-width: 600px; display: table-cell; vertical-align: top; width: 600px;">
                                    <div class="col_cont" style="width:100% !important;">
                                        <!--[if (!mso)&(!IE)]><!-->
                                        <div
                                            style="border-top:0px solid #D4F9EF; border-left:0px solid #D4F9EF; border-bottom:0px solid #D4F9EF; border-right:0px solid #D4F9EF; padding-top:25px; padding-bottom:25px; padding-right: 25px; padding-left: 25px;">
                                            <!--<![endif]-->
                                            <table cellpadding="0" cellspacing="0" class="social_icons"
                                                role="presentation"
                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                                valign="top" width="100%">
                                                <tbody>
                                                    <tr style="vertical-align: top;" valign="top">
                                                        <td style="word-break: break-word; vertical-align: top; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
                                                            valign="top">
                                                            <table align="center" cellpadding="0" cellspacing="0"
                                                                class="social_table" role="presentation"
                                                                style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-tspace: 0; mso-table-rspace: 0; mso-table-bspace: 0; mso-table-lspace: 0;"
                                                                valign="top">
                                                                <tbody>
                                                                    <tr align="center"
                                                                        style="vertical-align: top; display: inline-block; text-align: center;"
                                                                        valign="top">
                                                                        <td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;"
                                                                            valign="top"><a
                                                                                href="https://www.facebook.com/thuc.katy/"
                                                                                target="_blank"><img alt="Facebook"
                                                                                    height="32"
                                                                                    src="https://res.cloudinary.com/katyperrycbt/image/upload/v1618988106/facebook_plthes.png"
                                                                                    style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
                                                                                    title="facebook" width="32" /></a>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#ffffff;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; color: #ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">
                                                        Katyperrycbt Team • Block 6, Linh Trung Ward, Thu Duc City,
                                                        Vietnam 700000</p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                                            <div
                                                style="color:#ffffff;font-family:Arial, Helvetica Neue, Helvetica, sans-serif;line-height:1.2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
                                                <div class="txtTinyMce-wrapper"
                                                    style="line-height: 1.2; font-size: 12px; color: #ffffff; font-family: Arial, Helvetica Neue, Helvetica, sans-serif; mso-line-height-alt: 14px;">
                                                    <p
                                                        style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">
                                                        <a href="mailto:katyperrycbt@gmail.com" rel="noreferer"
                                                            style="text-decoration: underline; color: #ffffff;"
                                                            target="_blank">Contact Us</a> | <a
                                                            href="https://memories-of-me.herokuapp.com/user/toggleSubcribe?viaEmail=${code}" rel="noreferer"
                                                            style="text-decoration: underline; color: #ffffff;"
                                                            target="_blank">Unsubscribe</a></p>
                                                </div>
                                            </div>
                                            <!--[if mso]></td></tr></table><![endif]-->
                                            <!--[if (!mso)&(!IE)]><!-->
                                        </div>
                                        <!--<![endif]-->
                                    </div>
                                </div>
                                <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                                <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                            </div>
                        </div>
                    </div>
                    <div style="margin-left: 50px;">
                        <table width="100%" border="0" cellspacing="0" cellpadding="0" align="center">
                            <tbody>
                                <tr>
                                    <td height="16" style="font-size: 0px; line-height: 0px; height: 16px;">
                                        &nbsp;</td>
                                </tr>
                                <tr>
                                    <td align="center" valign="top">
                                        <table border="0" cellspacing="0" cellpadding="0" align="left"
                                            class="em_wrapper">
                                            <tbody>
                                                <tr>
                                                    <td class="em_grey" align="center" valign="middle"
                                                        style="font-family: Arial, sans-serif; font-size: 11px; line-height: 16px; color: rgb(67, 67, 67);">
                                                        © MEmories 2021 &nbsp;|&nbsp; <a
                                                            href="https://memories-of-me.herokuapp.com/user/toggleSubcribe?viaEmail=${code}" rel="noreferrer"
                                                            target="_blank"
                                                            style="text-decoration: underline; color: rgb(67, 67, 67);">Unsubscribe</a>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <td height="16" style="font-size: 0px; line-height: 0px; height: 16px;">
                                        &nbsp;</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
            </tr>
        </tbody>
    </table>
    <!--[if (IE)]></div><![endif]-->
</body>

</html>
    `}

const sendMail = async (to, subject, html) => {
    const mg = mailgun({ apiKey: process.env.REACT_APP_MAILGUN, domain: process.env.REACT_APP_MAILGUN_URL });
    let data = {
        ...emailData,
        to,
        subject,
        html
    };
    mg.messages().send(data, function (error, body) {
        if (error) return error;
    });
}

export const getPosts = async (req, res) => {

    if (!req.userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        const isOops = await Oops.findById(process.env.OOPS);
        let isOOpsGGID;
        if (!mongoose.Types.ObjectId.isValid(req.userId)) {
            isOOpsGGID = await User.findOne({ ggId: req.userId });
        } else {
            isOOpsGGID = await User.findById(req.userId);
        }
        const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
        const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

        if (isUpxi || isGGUpxi) {
            try {
                let postMessage = await PostMessage.find();
                let filter = postMessage.filter((each) => each.visibility === 'onlyMe');

                for (let i = 0; i < filter.length; i++) {
                    const temp = postMessage.indexOf(filter[i]);
                    if (filter[i]['creator'] === req.userId) {

                        filter[i]['title'] = CryptoJS.AES.decrypt(filter[i]['title'], req.userId).toString(CryptoJS.enc.Utf8);
                        filter[i]['message'] = CryptoJS.AES.decrypt(filter[i]['message'], req.userId).toString(CryptoJS.enc.Utf8);
                        filter[i]['selectedFile'] = CryptoJS.AES.decrypt(filter[i]['selectedFile'], req.userId).toString(CryptoJS.enc.Utf8);
                        filter[i]['creatorAvt'] = CryptoJS.AES.decrypt(filter[i]['creatorAvt'], req.userId).toString(CryptoJS.enc.Utf8);
                        filter[i]['name'] = CryptoJS.AES.decrypt(filter[i]['name'], req.userId).toString(CryptoJS.enc.Utf8);

                        postMessage[temp] = filter[i];
                    } else {
                        postMessage.splice(temp, 1);
                    }
                }

                let filter2 = postMessage.filter((each) => each.visibility === 'followers');
                const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
                const youFollow = us.info?.follow ? us.info.follow : [];

                for (let i = 0; i < filter2.length; i++) {
                    const temp2 = postMessage.indexOf(filter2[i]);
                    if (!youFollow.includes(filter2[i]['creator']) && filter2[i]['creator'] !== req.userId) postMessage.splice(temp2, 1);
                }


                res.status(200).json(postMessage);
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        } else {
            try {
                let postMessage = await PostMessage.find({ oops: false });

                if (postMessage.length === 0) {
                    postMessage = [
                        {
                            tags: ['Tag'],
                            likes: [],
                            title: 'Hello, chưa có kỉ niệm nào cho bạn cả :"(',
                            message: 'Hãy thử tạo một kỷ niệm mới ở khung bên phải.',
                            name: 'Chào bạn',
                            creator: 'Login_required',
                            createdAt: '0000-03-07T09:45:48.790+00:00',
                            selectedFile: 'https://res.cloudinary.com/katyperrycbt/image/upload/v1614954793/nz7v6t3vwijhy1z0njka.jpg',
                            modified: false,
                            __v: 0,
                            _id: 'null'
                        }
                    ];
                    return res.status(200).json(postMessage);
                } else {
                    let filter = postMessage.filter((each) => each.visibility === 'onlyMe');

                    for (let i = 0; i < filter.length; i++) {
                        const temp = postMessage.indexOf(filter[i]);
                        if (filter[i]['creator'] === req.userId) {

                            filter[i]['title'] = CryptoJS.AES.decrypt(filter[i]['title'], req.userId).toString(CryptoJS.enc.Utf8);
                            filter[i]['message'] = CryptoJS.AES.decrypt(filter[i]['message'], req.userId).toString(CryptoJS.enc.Utf8);
                            filter[i]['selectedFile'] = CryptoJS.AES.decrypt(filter[i]['selectedFile'], req.userId).toString(CryptoJS.enc.Utf8);
                            filter[i]['creatorAvt'] = CryptoJS.AES.decrypt(filter[i]['creatorAvt'], req.userId).toString(CryptoJS.enc.Utf8);
                            filter[i]['name'] = CryptoJS.AES.decrypt(filter[i]['name'], req.userId).toString(CryptoJS.enc.Utf8);

                            postMessage[temp] = filter[i];
                        } else {
                            postMessage.splice(temp, 1);
                        }
                    }

                    let filter2 = postMessage.filter((each) => each.visibility === 'followers');
                    const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
                    const youFollow = us.info?.follow ? us.info.follow : [];

                    for (let i = 0; i < filter2.length; i++) {
                        const temp2 = postMessage.indexOf(filter2[i]);
                        if (!youFollow.includes(filter2[i]['creator']) && filter2[i]['creator'] !== req.userId) postMessage.splice(temp2, 1);
                    }

                    return res.status(200).json(postMessage);
                }
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        }
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;
    const { visibility } = post;

    if (!req.userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        const isOops = await Oops.findById(process.env.OOPS);
        let isGGOop = '';
        if (mongoose.Types.ObjectId.isValid(req.userId)) {
            isGGOop = await User.findById(req.userId);
        } else {
            isGGOop = await User.findOne({ ggId: req.userId });
        }
        const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
        const isGGUpxi = isOops['oopsMembers'].indexOf(isGGOop.ggId) > -1;

        post.oops = isUpxi || isGGUpxi;

        if (!post.oops) {
            const numofPosts = await PostMessage.find({ creator: req.userId }).exec();
            if (numofPosts && numofPosts?.length === 5) {
                return res.status(400).json({ message: 'Each user can only post for maximum 5 posts due to limited storage. We\'re sorry, delete old posts and try again!' })
            }
        }

        if (post.selectedFile) {
            await cloudinary.v2.uploader.upload(post.selectedFile)
                .then((result) => {
                    console.log(result.url);
                    post.selectedFile = result.url;
                }).catch((error) => {
                    console.log(error);
                    post.selectedFile = 'https://res.cloudinary.com/katyperrycbt/image/upload/v1615115485/filewastoolarge_kwwpt9.png'
                });
        } else {
            post.selectedFile = '';
        }
        let newPost = {};
        let encryptNewPost = {};
        if (visibility && visibility === 'onlyMe') {
            console.log('true');
            for (var key of Object.keys(post)) {
                let encrypt = '';
                if (typeof post[key] === 'object' && post[key] !== null) {

                    // encrypt = CryptoJS.AES.encrypt(JSON.stringify(post[key]), req.userId).toString();
                    encrypt = post[key];
                } else {
                    if (['tags', 'visibility', 'oops', 'createdAt'].includes(key)) {
                        encrypt = post[key];
                    } else {
                        encrypt = CryptoJS.AES.encrypt(post[key].toString(), req.userId).toString();
                    }
                }
                encryptNewPost[key] = encrypt;
                console.log(encryptNewPost);
            }
            newPost = new PostMessage({ ...encryptNewPost, creator: req.userId, createdAt: new Date().toISOString() });;
        } else {
            newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
        }

        try {

            await newPost.save();

            if (visibility && visibility === 'onlyMe') return res.status(201).json(newPost);

            try {
                const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
                if (us.info.subcribe) {
                    const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
                    const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === us.email);
                    if (thisEmailIsInBlackList.length === 0) {
                        const secure = post.selectedFile.splice(4, 0, 's');
                        const thisHTML = newTemplate(post.title, secure, post.message, us._id + 'qeqwcl456');
                        const users = await User.find();
                        const listEmail = [];
                        for (let i = 0; i < users.length; i++) {
                            if (users[i].info?.subcribe) {
                                const temp = blacklist.emailList.filter((email) => email === users[i].email);
                                if (visibility === 'followers') {
                                    const youFollow = users[i].info?.follow ? users[i].info.follow : [];
                                    if (youFollow.includes(post['creator'])) listEmail.push(users[i].email);
                                    continue;
                                }
                                if (post.oops || visibility === 'oops') {
                                    console.log('true');
                                    let temp = '';
                                    if (mongoose.Types.ObjectId.isValid(users[i]._id)) {
                                        temp = await User.findById(users[i]._id);
                                    }
                                    const isThisUpxi = isOops['oopsMembers'].indexOf(users[i]._id) > -1;
                                    const isThisGGUpxi = isOops['oopsMembers'].indexOf(temp.ggId) > -1;
                                    if (isThisGGUpxi || isThisUpxi) {
                                        listEmail.push(users[i].email);
                                    }
                                    continue;
                                }
                                if (temp.length === 0) {
                                    listEmail.push(users[i].email);
                                }
                            }
                        }
                        console.log(listEmail);
                        const emailForm = {
                            to: listEmail,
                            subject: `New MEmory from ${us.name}!`,
                            html: thisHTML
                        }
                        sendMail(emailForm.to, emailForm.subject, emailForm.html);
                    }
                }
            } catch (error) {
                console.log(error);
            }

            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }
}

export const updatePost = async (req, res) => {
    const { userId } = req;
    if (!userId) return res.status(404).json({ message: 'Unauthorized access!' });

    const { id: _id } = req.params;

    let post = req.body;
    
    try {
        if (post.selectedFile) {
            await cloudinary.v2.uploader.upload(post.selectedFile)
                .then((result) => {
                    console.log(result.url);
                    post.selectedFile = result.url;
                }).catch((error) => {
                    console.log(error);
                });
        }
        // console.log(post);
        const oldPost = await PostMessage.findById(_id);

        if (post.visibility && post.visibility === 'onlyMe') {
            post['title'] = post['title'] ? CryptoJS.AES.encrypt(post['title'].toString(), req.userId).toString() : (oldPost.visibility !== 'onlyMe' ? CryptoJS.AES.encrypt(oldPost['title'].toString(), req.userId).toString() : oldPost['title']);
            post['message'] = post['message'] ? CryptoJS.AES.encrypt(post['message'].toString(), req.userId).toString() : (oldPost.visibility !== 'onlyMe' ? CryptoJS.AES.encrypt(oldPost['message'].toString(), req.userId).toString() : oldPost['message']);
            post['selectedFile'] = post['selectedFile'] ? CryptoJS.AES.encrypt(post['selectedFile'].toString(), req.userId).toString(): (oldPost.visibility !== 'onlyMe' ? CryptoJS.AES.encrypt(oldPost['selectedFile'].toString(), req.userId).toString() : oldPost['selectedFile']);
            post['creatorAvt'] = post['creatorAvt'] ?  CryptoJS.AES.encrypt(post['creatorAvt'].toString(), req.userId).toString() : (oldPost.visibility !== 'onlyMe' ? CryptoJS.AES.encrypt(oldPost['creatorAvt'].toString(), req.userId).toString() : oldPost['creatorAvt']);
            post['name'] =  post['name'] ? CryptoJS.AES.encrypt(post['name'], req.userId).toString(): (oldPost.visibility !== 'onlyMe' ? CryptoJS.AES.encrypt(oldPost['name'].toString(), req.userId).toString() : oldPost['name']);


        } else if (post.visibility && post.visibility !== 'onlyMe' && oldPost.visibility === 'onlyMe') {
            post['title'] = post['title'] ? post['title'] : CryptoJS.AES.decrypt(oldPost['title'], req.userId).toString(CryptoJS.enc.Utf8);
            post['message'] = post['message'] ? post['message'] : CryptoJS.AES.decrypt(oldPost['message'], req.userId).toString(CryptoJS.enc.Utf8);
            post['selectedFile'] = post['selectedFile'] ? post['selectedFile'] : CryptoJS.AES.decrypt(oldPost['selectedFile'], req.userId).toString(CryptoJS.enc.Utf8);
            post['creatorAvt'] = post['creatorAvt'] ? post['creatorAvt'] : CryptoJS.AES.decrypt(oldPost['creatorAvt'], req.userId).toString(CryptoJS.enc.Utf8);
            post['name'] = post['name'] ? post['name'] : CryptoJS.AES.decrypt(oldPost['name'], req.userId).toString(CryptoJS.enc.Utf8);

        }

        let prepare = {};


        prepare = {
            ...post,
            modified: true,
            _id
        }

        if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, { $set: prepare }, { new: true });
        // console.log(updatePost);
        // const temp = await PostMessage.findById(_id);
        // console.log(temp)
        res.status(201).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message })

    }
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post delete successfully!' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    try {
        const us = mongoose.Types.ObjectId.isValid(post.creator) ? await User.findById(post.creator) : await User.findOne({ ggId: post.creator });
        const whoHeart = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
        if (us.info.subcribe) {
            const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
            const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === us.email);
            if (thisEmailIsInBlackList.length === 0) {
                const thisHTML = newTemplate(post.title, post.selectedFile.splice(4, 0, 's'), post.message, us._id + 'qeqwcl456')
                const emailForm = {
                    to: us.email,
                    subject: `${whoHeart.name} hearted your MEmory!`,
                    html: thisHTML
                }
                sendMail(emailForm.to, emailForm.subject, emailForm.html);
            }
        }
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(updatedPost);
}

export const resetAndGetPosts = async (req, res) => {
    const { userId } = req;
    if (!userId) return res.json({ message: 'Unauthenticated' });
    console.log('GG ID', userId);

    const { name, avt, ggId } = await User.findById(userId);

    let thisUserPost = await PostMessage.find({ creator: (ggId ? ggId : userId) });
    // const thisGGUserPost = await PostMessage.find({ creator: ggId });

    // console.log('NAME AND AVT', name, avt);
    console.log('LENTH', thisUserPost.length);
    if (thisUserPost) {
        for (let i = 0; i < thisUserPost.length; i++) {
            thisUserPost[i].name = name;
            thisUserPost[i].creatorAvt = avt;
            // console.log(temp);
            await PostMessage.findByIdAndUpdate(thisUserPost[i]._id, thisUserPost[i], { new: true });
        }
    }

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.findOne({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;
    if (isUpxi || isGGUpxi) {
        try {
            const postMessage = await PostMessage.find();
            console.log('DONE ROI');
            res.status(200).json(postMessage);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    } else {
        try {
            let postMessage = await PostMessage.find({ oops: false });
            if (postMessage.length === 0) {
                postMessage = [
                    {
                        tags: ['Tag'],
                        likes: [],
                        title: 'Hello, chưa có kỉ niệm nào cho bạn cả :"(',
                        message: 'Hãy thử tạo một kỷ niệm mới ở khung bên phải.',
                        name: 'Chào bạn',
                        creator: 'Login_required',
                        createdAt: '0000-03-07T09:45:48.790+00:00',
                        selectedFile: 'https://res.cloudinary.com/katyperrycbt/image/upload/v1614954793/nz7v6t3vwijhy1z0njka.jpg',
                        modified: false,
                        __v: 0,
                        _id: 'null'
                    }
                ]
            }
            res.status(200).json(postMessage);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export const getComments = async (req, res) => {
    const { userId } = req;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.findOne({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

    if (isUpxi || isGGUpxi) {

        try {
            const getComments = await Comments.find();
            res.status(200).json(getComments);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }

    } else {
        try {
            const postMessage = await PostMessage.find({ oops: false });
            const listPostId = [];
            for (let i = 0; i < postMessage.length; i++) {
                listPostId.push(postMessage[i]['_id']);
            };
            const getComments = await Comments.find({ postId: { '$in': listPostId } });
            res.status(200).json(getComments);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
        // res.status(200).json({ message: 'Not allowed!' });
    }
}

export const postComment = async (req, res) => {
    const { userId } = req;
    const { postId, comment } = req.body;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.findOne({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

    if (isUpxi || isGGUpxi) {

        const newComment = new Comments({ postId, comment, commentId: userId, createdAt: new Date().toISOString() });

        try {

            await newComment.save();

            try {
                const commenter = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : await User.findOne({ ggId: userId });
                const postOwnerID = mongoose.Types.ObjectId.isValid(postId) ? await PostMessage.findById(postId) : '';
                let postOwner = mongoose.Types.ObjectId.isValid(postOwnerID.creator) ? await User.findById(postOwnerID.creator) : await User.findOne({ ggId: postOwnerID.creator });
                if (postOwner.info.subcribe) {
                    //
                    const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
                    const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === postOwner.email);
                    if (thisEmailIsInBlackList.length === 0) {
                        const thisHTML = newTemplate(postOwnerID.title, postOwnerID.selectedFile.splice(4, 0, 's'), comment, postOwner._id + 'qeqwcl456')
                        const emailForm = {
                            to: postOwner.email,
                            subject: `${commenter.name} left a comment in your MEmory!`,
                            html: thisHTML
                        }
                        sendMail(emailForm.to, emailForm.subject, emailForm.html);
                    }
                }
            } catch (error) {
                console.log(error);

            }

            res.status(201).json(newComment);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }

    } else {
        res.status(200).json({ message: 'Not allowed!' });
    }
}

export const editComment = async (req, res) => {
    const { userId } = req;
    const newCmt = req.body;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        const updatedComment = await Comments.findByIdAndUpdate(cmtId, { ...newCmt, modified: true }, { new: true });
        // console.log(updatedComment);
        // console.log(cmtId);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const delComment = async (req, res) => {
    const { userId } = req;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        await Comments.findByIdAndRemove(cmtId);

        res.status(200).json({ message: 'Comment has been deleted!' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const starComment = async (req, res) => {
    const { userId } = req;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        const cmt = await Comments.findById(cmtId);

        const index = cmt.hearts.findIndex((heart) => heart === String(userId));

        if (index === -1) {
            cmt.hearts.push(userId);
        } else {
            cmt.hearts = cmt.hearts.filter((heart) => heart !== String(userId));
        }

        const updatedComment = await Comments.findByIdAndUpdate(cmtId, cmt, { new: true });

        const us = mongoose.Types.ObjectId.isValid(cmt.commentId) ? await User.findById(cmt.commentId) : await User.findOne({ ggId: cmt.commentId });
        const whoHeart = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
        if (us.info.subcribe) {
            const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
            const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === us.email);
            if (thisEmailIsInBlackList.length === 0) {
                const thisHTML = newTemplate('', 'https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg', cmt.comment, us._id + 'qeqwcl456')
                const emailForm = {
                    to: us.email,
                    subject: `${whoHeart.name} liked your comment!`,
                    html: thisHTML
                }
                sendMail(emailForm.to, emailForm.subject, emailForm.html);
            }
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}