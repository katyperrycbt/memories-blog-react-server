import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mailgun from 'mailgun-js';
import Subcribe from '../models/subcribe.js';
import ClientIP from '../models/clientIP.js';
import Invitation from '../models/invitation.js';

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET
});

const emailData = {
	from: 'MEmories <no-reply@oopsmemories.site>',
	to: '',
	subject: '',
	html: ''
}

const profileTemplate = (avt, name, email, code) => {
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
		@media (max-width: 660px) {

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
		@media (max-width: 660px) {
			.icons-inner {
				text-align: center;
			}

			.icons-inner td {
				margin: 0 auto;
			}
		}
	</style>
</head>

<body class="clean-body" style="margin: 0; padding: 0; -webkit-text-size-adjust: 100%; background-color: #dfded1;">
	<!--[if IE]><div class="ie-browser"><![endif]-->
	<table bgcolor="#dfded1" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
		style="table-layout: fixed; vertical-align: top; min-width: 320px; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #dfded1; width: 100%;"
		valign="top" width="100%">
		<tbody>
			<tr style="vertical-align: top;" valign="top">
				<td style="word-break: break-word; vertical-align: top;" valign="top">
					<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#dfded1"><![endif]-->
					<div style="background-color:#dfded1;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #dfded1;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#dfded1;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#dfded1;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#dfded1"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#dfded1;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:10px; padding-bottom:10px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 0px; padding-left: 0px;">
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
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/facebook2x_e9g7kj.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Facebook" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Twitter"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/twitter2x_p0og2r.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Twitter" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Instagram"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/instagram2x_t9vlzn.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Instagram" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="LinkedIn"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/linkedin2x_mcjmic.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="LinkedIn" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 7.5px; padding-left: 7.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Pinterest"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/pinterest2x_weglct.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Pinterest" width="32" /></a>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<div style="background-color:transparent;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #fcfbeb;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:#fcfbeb;background-image:url('https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/featured-area_1_bkjne3.png');background-position:center top;background-repeat:no-repeat">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:#fcfbeb"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:#fcfbeb;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:20px; padding-bottom:0px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:20px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div align="center" class="img-container center autowidth"
												style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]-->
													<img
													align="center" alt="Alternate text" border="0"
													class="center autowidth" src="${avt}"
													style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 416px; display: block;"
													title="Alternate text" width="416" />
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 30px; padding-bottom: 0px; font-family: Tahoma, sans-serif"><![endif]-->
											<div
												style="color:#595959;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:30px;padding-right:10px;padding-bottom:0px;padding-left:10px;">
												<div class="txtTinyMce-wrapper"
													style="line-height: 1.2; font-size: 12px; color: #595959; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
													<p
														style="margin: 0; font-size: 14px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">
														<strong><span style="font-size: 38px;">${name}</span></strong>
													</p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 5px; padding-bottom: 40px; font-family: Tahoma, sans-serif"><![endif]-->
											<div
												style="color:#595959;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:1.2;padding-top:5px;padding-right:10px;padding-bottom:40px;padding-left:10px;">
												<div class="txtTinyMce-wrapper"
													style="line-height: 1.2; font-size: 12px; color: #595959; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 14px;">
													<p
														style="margin: 0; font-size: 15px; line-height: 1.2; word-break: break-word; text-align: center; mso-line-height-alt: 18px; margin-top: 0; margin-bottom: 0;">
														<span style="font-size: 15px;"><strong>${email}</strong></span>
													</p>
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

					<div style="background-color:transparent;">
						<div class="block-grid two-up"
							style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="320" style="background-color:transparent;width:320px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num6"
									style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 318px; width: 320px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Tahoma, sans-serif"><![endif]-->
											<div
												style="color:#555555;font-family:Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif;line-height:2;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper"
													style="line-height: 2; font-size: 12px; color: #555555; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; mso-line-height-alt: 24px;">
													<p
														style="margin: 0; font-size: 12px; line-height: 2; word-break: break-word; text-align: center; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
														<span style="font-size: 12px;"><a
																href="mailto:katyperrycbt@gmail.com" rel="noopener"
																style="text-decoration: none; color: #555555;"
																target="_blank">MEmories Team</a>  |   <a
																href="https://memories-of-me.herokuapp.com/user/toggleSubcribe?viaEmail=${code}" rel="noopener"
																style="text-decoration: none; color: #555555;"
																target="_blank">Unsubscsribe</a></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td><td align="center" width="320" style="background-color:transparent;width:320px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num6"
									style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 318px; width: 320px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
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
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Facebook"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/facebook2x_e9g7kj.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Facebook" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Twitter"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/twitter2x_p0og2r.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Twitter" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Instagram"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/instagram2x_t9vlzn.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Instagram" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 0; padding-right: 2.5px; padding-left: 2.5px;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="LinkedIn"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/linkedin2x_mcjmic.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="LinkedIn" width="32" /></a>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<div style="background-color:transparent;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 640px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:640px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="640" style="background-color:transparent;width:640px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 640px; display: table-cell; vertical-align: top; width: 640px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div align="center" class="img-container center autowidth"
												style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="center"><![endif]--><img
													align="center" alt="Alternate text" border="0"
													class="center autowidth" src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619022360/bottom-graphics_vxxxny.png"
													style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 628px; display: block;"
													title="Alternate text" width="628" />
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
	
					<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				</td>
			</tr>
		</tbody>
	</table>
	<!--[if (IE)]></div><![endif]-->
</body>

</html>
    `
}

const welcomeTemplate = (name) => {
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
	<link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css" />
	<link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css" />
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
		@media (max-width: 720px) {

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
		@media (max-width: 720px) {
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
					<div style="background-color:#FFFFFF;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:0px; padding-bottom:0px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:0px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table border="0" cellpadding="0" cellspacing="0" class="divider"
												role="presentation"
												style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
												valign="top" width="100%">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner"
															style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 0px; padding-right: 0px; padding-bottom: 0px; padding-left: 0px;"
															valign="top">
															<table align="center" border="0" cellpadding="0"
																cellspacing="0" class="divider_content" height="30"
																role="presentation"
																style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 30px; width: 100%;"
																valign="top" width="100%">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td height="30"
																			style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
																			valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<div style="background-color:transparent;">
						<div class="block-grid two-up no-stack"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="350" style="background-color:transparent;width:350px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 20px; padding-top:10px; padding-bottom:10px;"><![endif]-->
								<div class="col num6"
									style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 348px; width: 350px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:10px; padding-bottom:10px; padding-right: 20px; padding-left: 20px;">
											<!--<![endif]-->
											<div align="left" class="img-container left fixedwidth"
												style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="left"><![endif]--><img
													alt="Image" border="0" class="left fixedwidth"
													src="https://res.cloudinary.com/katyperrycbt/image/upload/v1618987296/photo_fyxf36.png"
													style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 155px; display: block;"
													title="Image" width="155" />
												<!--[if mso]></td></tr></table><![endif]-->
											</div>
											<!--[if (!mso)&(!IE)]><!-->
										</div>
										<!--<![endif]-->
									</div>
								</div>
								<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
								<!--[if (mso)|(IE)]></td><td align="center" width="350" style="background-color:transparent;width:350px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num6"
									style="display: table-cell; vertical-align: top; max-width: 320px; min-width: 348px; width: 350px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 20px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
											<div
												style="color:#E3E3E3;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.2;padding-top:20px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.2; color: #E3E3E3; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 14px;">
													<p
														style="margin: 0; font-size: 12px; line-height: 1.2; text-align: right; word-break: break-word; mso-line-height-alt: 14px; margin-top: 0; margin-bottom: 0;">
														<span style="font-size: 12px;">Welcome to MEmories</span></p>
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
					<div
						style="background-image:url('https://res.cloudinary.com/katyperrycbt/image/upload/v1619105666/Bg_text_ani_keckns.gif');background-position:top center;background-repeat:no-repeat;background-color:#FFFFFF;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('images/Bg_text_ani.gif');background-position:top center;background-repeat:no-repeat;background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:40px; padding-bottom:5px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:40px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div align="right" class="img-container right fixedwidth"
												style="padding-right: 0px;padding-left: 0px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr style="line-height:0px"><td style="padding-right: 0px;padding-left: 0px;" align="right"><![endif]--><img
													align="right" alt="Image" border="0" class="right fixedwidth"
													src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619105664/iPhone_1_erfmnk.png"
													style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; width: 100%; max-width: 350px; float: none; display: block;"
													title="Image" width="350" />
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
					<div
						style="background-image:url('https://res.cloudinary.com/katyperrycbt/image/upload/v1619105663/bg_wave_1_ha9uyg.png');background-position:top center;background-repeat:repeat;background-color:#F4F4F4;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('images/bg_wave_1.png');background-position:top center;background-repeat:repeat;background-color:#F4F4F4;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table border="0" cellpadding="0" cellspacing="0" class="divider"
												role="presentation"
												style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
												valign="top" width="100%">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner"
															style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
															valign="top">
															<table align="center" border="0" cellpadding="0"
																cellspacing="0" class="divider_content" height="70"
																role="presentation"
																style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 70px; width: 100%;"
																valign="top" width="100%">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td height="70"
																			style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
																			valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<div style="background-color:#F4F4F4;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F4F4;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 10px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
											<div
												style="color:#555555;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:1.2;padding-top:10px;padding-right:30px;padding-bottom:0px;padding-left:30px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #555555; mso-line-height-alt: 14px;">
													<p
														style="margin: 0; font-size: 14px; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">
														<strong><span style="font-size: 46px;">Welcome <span
																	style="color: #3d3bee; font-size: 46px;">${name}, thank you for joining us!</span>!</span></strong>
													</p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 15px; padding-bottom: 5px; font-family: Arial, sans-serif"><![endif]-->
											<div
												style="color:#555555;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:15px;padding-right:30px;padding-bottom:5px;padding-left:30px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.5; color: #555555; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 18px;">
													<p
														style="margin: 0; font-size: 12px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 18px; margin-top: 0; margin-bottom: 0;">
														<strong><span style="font-size: 20px;">Hello, this is my
																personal website (Katyperrycbt Team), it is about the
																topic of a blog or small-scale social network. From the
																very beginning until now, I have spent about 2 months of
																effort to perfect it. The version you see right now may
																not be perfect but I believe I will make it
																better!</span></strong></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 30px; padding-left: 30px; padding-top: 15px; padding-bottom: 20px; font-family: Arial, sans-serif"><![endif]-->
											<div
												style="color:#7C7C7C;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:15px;padding-right:30px;padding-bottom:20px;padding-left:30px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.5; color: #7C7C7C; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 18px;">
													<p
														style="margin: 0; font-size: 16px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 24px; margin-top: 0; margin-bottom: 0;">
														<span style="font-size: 16px;">You are invited to join in to try
															the app, that we really need your evaluation! </span></p>

													<p
														style="margin: 0; font-size: 12px; line-height: 1.5; word-break: break-word; mso-line-height-alt: 18px; margin-top: 0; margin-bottom: 0;">
														 </p>
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
					<div style="background-color:#F4F4F4;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F4F4;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#FFFFFF;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 5px; padding-left: 5px; padding-top:5px; padding-bottom:5px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:5px; padding-right: 5px; padding-left: 5px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 35px; padding-top: 25px; padding-bottom: 0px; font-family: 'Trebuchet MS', Tahoma, sans-serif"><![endif]-->
											<div
												style="color:#444444;font-family:'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif;line-height:1.2;padding-top:25px;padding-right:10px;padding-bottom:0px;padding-left:35px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.2; font-family: 'Montserrat', 'Trebuchet MS', 'Lucida Grande', 'Lucida Sans Unicode', 'Lucida Sans', Tahoma, sans-serif; color: #444444; mso-line-height-alt: 14px;">
													<p
														style="margin: 0; font-size: 14px; line-height: 1.2; font-family: Montserrat, Trebuchet MS, Lucida Grande, Lucida Sans Unicode, Lucida Sans, Tahoma, sans-serif; word-break: break-word; mso-line-height-alt: 17px; margin-top: 0; margin-bottom: 0;">
														<span style="background-color: #93f5ed; font-size: 14px;"><span
																style="font-size: 24px; background-color: #93f5ed;"><span
																	style="font-size: 24px; background-color: #93f5ed;"> List
																	of features: </span></span></span></p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 20px; padding-left: 30px; padding-top: 15px; padding-bottom: 30px; font-family: Arial, sans-serif"><![endif]-->
											<div
												style="color:#555555;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.8;padding-top:15px;padding-right:20px;padding-bottom:30px;padding-left:30px;">
												<div class="txtTinyMce-wrapper"
													style="line-height: 1.8; font-size: 12px; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; color: #555555; mso-line-height-alt: 22px;">
													<ul style="font-size: 12px;">
														<li
															style="font-size: 16px; line-height: 1.8; mso-line-height-alt: 29px;">
															<span style="font-size: 16px;">Because of limited storage,
																each account is allowed to post 5 posts. So delete one
																if you hit the limit! </span></li>
														<li
															style="font-size: 16px; line-height: 1.8; mso-line-height-alt: 29px;">
															<span style="font-size: 16px;">The features include: post,
																edit, delete, like, comment, chat (recommend using this
																feature on computer), receive email automatically, view
																information, edit personal information, ... </span></li>

													</ul>
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
					<div style="background-color:#F4F4F4;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#F4F4F4;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:25px; padding-bottom:60px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:25px; padding-bottom:60px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<div align="center" class="button-container"
												style="padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="" style="height:54pt;width:251.25pt;v-text-anchor:middle;" arcsize="13%" stroke="false" fillcolor="#3D3BEE"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:26px"><![endif]-->
												<div
													style="text-decoration:none;display:inline-block;color:#ffffff;background-color:#3D3BEE;border-radius:9px;-webkit-border-radius:9px;-moz-border-radius:9px;width:auto; width:auto;;border-top:1px solid #3D3BEE;border-right:1px solid #3D3BEE;border-bottom:1px solid #3D3BEE;border-left:1px solid #3D3BEE;padding-top:10px;padding-bottom:10px;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center;mso-border-alt:none;word-break:keep-all;">
													<a href="https://oopsmemories.site/">
														<span
															style="padding-left:45px;padding-right:45px;font-size:26px;display:inline-block;letter-spacing:undefined;"><span
																style="font-size: 16px; line-height: 2; word-break: break-word; mso-line-height-alt: 32px;"><span
																	data-mce-style="font-size: 26px; line-height: 52px;"
																	style="font-size: 26px; line-height: 52px;"><strong>START
																		NOW</strong></span></span></span>
													</a>
												</div>
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
					<div
						style="background-image:url('https://res.cloudinary.com/katyperrycbt/image/upload/v1619105663/bg_wave_2_vih3bt.png');background-position:top center;background-repeat:repeat;background-color:#F4F4F4;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: transparent;">
							<div
								style="border-collapse: collapse;display: table;width: 100%;background-color:transparent;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-image:url('images/bg_wave_2.png');background-position:top center;background-repeat:repeat;background-color:#F4F4F4;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:transparent"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:transparent;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:0px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:5px; padding-bottom:0px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<table border="0" cellpadding="0" cellspacing="0" class="divider"
												role="presentation"
												style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
												valign="top" width="100%">
												<tbody>
													<tr style="vertical-align: top;" valign="top">
														<td class="divider_inner"
															style="word-break: break-word; vertical-align: top; min-width: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px;"
															valign="top">
															<table align="center" border="0" cellpadding="0"
																cellspacing="0" class="divider_content" height="70"
																role="presentation"
																style="table-layout: fixed; vertical-align: top; border-spacing: 0; border-collapse: collapse; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-top: 0px solid transparent; height: 70px; width: 100%;"
																valign="top" width="100%">
																<tbody>
																	<tr style="vertical-align: top;" valign="top">
																		<td height="70"
																			style="word-break: break-word; vertical-align: top; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;"
																			valign="top"><span></span></td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<div style="background-color:#FFFFFF;">
						<div class="block-grid"
							style="min-width: 320px; max-width: 700px; overflow-wrap: break-word; word-wrap: break-word; word-break: break-word; Margin: 0 auto; background-color: #FFFFFF;">
							<div style="border-collapse: collapse;display: table;width: 100%;background-color:#FFFFFF;">
								<!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px"><tr class="layout-full-width" style="background-color:#FFFFFF"><![endif]-->
								<!--[if (mso)|(IE)]><td align="center" width="700" style="background-color:#FFFFFF;width:700px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:15px; padding-bottom:35px;"><![endif]-->
								<div class="col num12"
									style="min-width: 320px; max-width: 700px; display: table-cell; vertical-align: top; width: 700px;">
									<div class="col_cont" style="width:100% !important;">
										<!--[if (!mso)&(!IE)]><!-->
										<div
											style="border-top:0px solid transparent; border-left:0px solid transparent; border-bottom:0px solid transparent; border-right:0px solid transparent; padding-top:15px; padding-bottom:35px; padding-right: 0px; padding-left: 0px;">
											<!--<![endif]-->
											<!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
											<div
												style="color:#838383;font-family:Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif;line-height:1.5;padding-top:10px;padding-right:10px;padding-bottom:10px;padding-left:10px;">
												<div class="txtTinyMce-wrapper"
													style="font-size: 12px; line-height: 1.5; color: #838383; font-family: Open Sans, Helvetica Neue, Helvetica, Arial, sans-serif; mso-line-height-alt: 18px;">
													<p
														style="margin: 0; font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">
														<span
															style="color: #000000; font-size: 14px;"><strong>MEmories</strong></span>,
														Block 6, Linh Trung Ward</p>
													<p
														style="margin: 0; font-size: 14px; line-height: 1.5; text-align: center; word-break: break-word; mso-line-height-alt: 21px; margin-top: 0; margin-bottom: 0;">
														Thu Duc City, Vietnam 700000   </p>
												</div>
											</div>
											<!--[if mso]></td></tr></table><![endif]-->
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
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 5px; padding-left: 0;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Facebook"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619105663/facebook2x_imfden.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Facebook" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 5px; padding-left: 0;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Twitter"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619105664/twitter2x_ckk0ri.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Twitter" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 5px; padding-left: 0;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="Instagram"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619105664/instagram2x_yp2fuz.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="Instagram" width="32" /></a>
																		</td>
																		<td style="word-break: break-word; vertical-align: top; padding-bottom: 5px; padding-right: 5px; padding-left: 0;"
																			valign="top"><a
																				href="https://www.facebook.com/thuc.katy/"
																				target="_blank"><img alt="LinkedIn"
																					height="32"
																					src="https://res.cloudinary.com/katyperrycbt/image/upload/v1619105664/linkedin2x_wfijlq.png"
																					style="text-decoration: none; -ms-interpolation-mode: bicubic; height: auto; border: 0; display: block;"
																					title="LinkedIn" width="32" /></a>
																		</td>
																	</tr>
																</tbody>
															</table>
														</td>
													</tr>
												</tbody>
											</table>
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
					<!--[if (mso)|(IE)]></td></tr></table><![endif]-->
				</td>
			</tr>
		</tbody>
	</table>
	<!--[if (IE)]></div><![endif]-->
</body>

</html>
	`;
}

String.prototype.splice = function (idx, rem, str) {
	return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
};

const sendMail = async (to, subject, html) => {
	const mg = mailgun({ apiKey: process.env.REACT_APP_MAILGUN, domain: process.env.REACT_APP_MAILGUN_URL });
	let data = {
		...emailData,
		to,
		subject,
		html
	};
	mg.messages().send(data, function (error, body) {
		// console.log(body);
	});
}

export const signin = async (req, res) => {
	const { email, password, ip, when } = req.body;

	try {

		const getIPObject = await ClientIP.findById(process.env.CLIENTIPS);

		let ips = getIPObject['ips'];

		let wasRecordedBefore = false;

		for (let i = 0; i < ips.length; i++) {
			if (ips[i].ip === ip) {
				ips[i].loginCount = parseInt(ips[i].loginCount) + 1;
				ips[i].latestVisitAt = when;
				wasRecordedBefore = true;
				break;
			}
		}

		if (!wasRecordedBefore) {
			let newRecord = {
				email: email,
				ip: ip,
				loginCount: 1,
				latestVisitAt: when
			}

			ips.push(newRecord);
		}

		getIPObject['ips'] = ips;

		await ClientIP.findByIdAndUpdate(process.env.CLIENTIPS, getIPObject, { new: true });

		const existingUser = await User.findOne({ email });

		if (!existingUser) return res.status(404).json({ message: "User does not exist." });

		const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

		if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

		const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'MEmemories', { expiresIn: "1h" });

		res.status(200).json({ result: existingUser, token });

	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

export const signup = async (req, res) => {
	const { email, password, confirmPassword, firstName, lastName, avt, ggId, invitationCode } = req.body;

	try {
		const invitationObjects = await Invitation.find();
		const invitationCodes = [];
		const invitationEmails = [];
		for (let i = 0; i < invitationObjects.length; i++) {
			invitationCodes.push(invitationObjects[i]['invitationCode']);
			invitationEmails.push(invitationObjects[i]['invitor'])
		}
		if (invitationCodes.includes(invitationCode)) {
			const inviter = invitationEmails[invitationCodes.indexOf(invitationCode)];

			const existingUser = await User.findOne({ email });

			if (existingUser) return res.status(400).json({ message: 'User already exist.' });

			if (password !== confirmPassword) return res.status(400).json({ message: 'Passwords do not match.' });

			const hasedPassword = await bcrypt.hash(password, 12);
			let avtLink = '';
			await cloudinary.v2.uploader.upload(avt)
				.then((result) => {
					console.log(result.url);
					avtLink = result.url;
				}).catch((error) => {
					console.log(error);
				});

			const result = await User.create({ email, password: hasedPassword, name: `${firstName} ${lastName}`, avt: avtLink, ggId: (ggId || ''), inviter: inviter, info: { subcribe: true } });

			const token = jwt.sign({ email: result.email, id: result._id }, 'MEmemories', { expiresIn: "1h" });

			await Invitation.deleteMany({ invitationCode: invitationCode });

			const thisHTML = welcomeTemplate(`${firstName} ${lastName}`);
			const emailForm = {
				to: email,
				subject: `Hello from MEmories!`,
				html: thisHTML
			}
			sendMail(emailForm.to, emailForm.subject, emailForm.html);

			res.status(200).json({ result, token });
		} else {
			res.status(404).json({ message: 'Incorrect invitation code!' });
		}

	} catch (error) {

		res.status(500).json({ message: error.message })

	}
}

export const getInfo = async (req, res) => {
	const { userId } = req;
	if (!userId) {
		res.status(404).json({ message: 'Unauthorized access!' });
		return;
	} else {
		try {
			let isUserExist;

			if (mongoose.Types.ObjectId.isValid(userId)) {
				isUserExist = await User.findById(userId);
			}

			const isUserGGExit = await User.findOne({ ggId: userId });

			if (isUserGGExit || isUserExist) {
				const whichReturn = isUserGGExit ? isUserGGExit : isUserExist;
				res.status(200).json(whichReturn);
				return;
			} else {
				res.status(200).json({ message: 'Google Account detected! Please create an account linked with this account to edit your information!' })
				return;
			}

		} catch (error) {
			console.log(error.message);
			res.status(500).json({ message: error.message });
		}
	}
}

export const updateInfo = async (req, res) => {
	const { userId } = req;
	const { email, oldPassword, newPassword, firstName, lastName, avt } = req.body;

	if (!userId) {
		res.status(404).json({ message: 'Unauthorized access!' });
		return;
	} else {
		try {
			let oldProfile
			if (mongoose.Types.ObjectId.isValid(userId)) {
				oldProfile = await User.findById(userId);
			} else {
				oldProfile = await User.findOne({ ggId: userId });
			}

			if (newPassword) {
				const isPasswordCorrect = await bcrypt.compare(oldPassword, oldProfile.password);

				if (!isPasswordCorrect) {
					console.log('reach here');
					return res.status(400).json({ message: "Old password incorrect!" })
				};

				const hashedPassword = await bcrypt.hash(newPassword, 12);
				oldProfile.password = hashedPassword;

			} else if (email) {
				const existingUser = await User.findOne({ email });

				if (existingUser && email !== oldProfile.email) {
					console.log('reach email');
					return res.status(400).json({ message: 'User already exist.' })
				};

				oldProfile.name = `${firstName} ${lastName}`;

				try {
					const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
					if (us.info.subcribe) {
						//
						const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
						const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === us.email);
						if (thisEmailIsInBlackList.length === 0) {
							const html = profileTemplate(us.avt.splice(4, 0, 's'), us.name, us.email, us._id + 'qeqwcl456');
							const users = await User.find();
							const listEmail = [];
							for (let i = 0; i < users.length; i++) {
								if (users[i].info?.subcribe) {
									const temp = blacklist.emailList.filter((email) => email === users[i].email);
									if (temp.length === 0) {
										listEmail.push(users[i].email);
									}
								}
							}
							console.log(listEmail);
							const emailForm = {
								to: listEmail,
								subject: `${us.name} updated their profile!`,
								html: html
							}
							sendMail(emailForm.to, emailForm.subject, emailForm.html);
						}
						//
					}
				} catch (error) {
					console.log(error);
				}

			} else if (avt) {
				// console.log('avt',avt);
				let avtLink = '';
				await cloudinary.v2.uploader.upload(avt)
					.then((result) => {
						console.log(result.url);
						avtLink = result.url;
					}).catch((error) => {
						console.log(error);
						return res.status(400).json({ message: 'Some errors with the image!' })
					});

				oldProfile.avt = avtLink;
				try {
					const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.findOne({ ggId: req.userId });
					if (us.info.subcribe) {
						//
						const blacklist = await Subcribe.findById(process.env.SUBCRIBE);
						const thisEmailIsInBlackList = blacklist.emailList.filter((email) => email === us.email);
						if (thisEmailIsInBlackList.length === 0) {
							const html = profileTemplate(avtLink.splice(4, 0, 's'), us.name, us.email, us._id + 'qeqwcl456');
							const users = await User.find();
							const listEmail = [];
							for (let i = 0; i < users.length; i++) {
								if (users[i].info?.subcribe) {
									const temp = blacklist.emailList.filter((email) => email === users[i].email);
									if (temp.length === 0) {
										listEmail.push(users[i].email);
									}
								}
							}
							console.log(listEmail);
							const emailForm = {
								to: listEmail,
								subject:`${us.name} updated their avatar!`,
								html: html
							}
							sendMail(emailForm.to, emailForm.subject, emailForm.html);
						}
						//
					}
				} catch (error) {
					console.log(error);
				}
			}

			const updatedInfo = await User.findByIdAndUpdate(userId, oldProfile, { new: true });

			res.status(200).json(updatedInfo);

		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

}

export const getAVTs = async (req, res) => {
	const { userId } = req;
	if (!userId) {
		res.status(404).json({ message: 'Unauthorized access!' });
		return;
	} else {
		try {
			const userNames = await User.find();
			let setOfAVT = [];

			for (let i = 0; i < userNames.length; i++) {
				if (userNames[i].ggId?.length > 0) {
					setOfAVT.push({ id: userNames[i].ggId, name: userNames[i].name, avt: userNames[i].avt, email: userNames[i].email });
				}
				setOfAVT.push({ id: userNames[i]._id, name: userNames[i].name, avt: userNames[i].avt, email: userNames[i].email });
			}

			return res.status(200).json(setOfAVT);

		} catch (error) {
			res.send(404).json({ message: 'NO AVTs!' });
		}
	}
}

export const toggleSubcribe = async (req, res) => {
	const { userId } = req;
	const {viaEmail} = req.query;

	if (!userId && !viaEmail) return res.json({ message: 'Unauthenticated!' });

	let which = userId || viaEmail;

	if (which.indexOf('qeqwcl456')) {
		which = which.replace('qeqwcl456', '');
	}

	try {
		let oldProfile
		if (mongoose.Types.ObjectId.isValid(which)) {
			oldProfile = await User.findById(which);
		} else {
			oldProfile = await User.findOne({ ggId: which });
		}

		const subcribe = oldProfile?.info?.subcribe ? oldProfile.info.subcribe : false;

		if (subcribe === false) {
			oldProfile.info.subcribe = true;
		} else {
			oldProfile.info.subcribe = false;
		}

		const updatedProfile = await User.findByIdAndUpdate(which, oldProfile, { new: true });

		res.status(200).json(updatedProfile);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
}