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

const profileTemplate = (avt, name, email) => {
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
																href="https://oopsmemories.site/" rel="noopener"
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

// const footer = `
// <br/><br/>
// Best regards,
// <strong>MEmories Team</strong>
// <br/><br/><br/>
// <img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg' alt='MEmories' />
// <p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">MEmories Team, Quarter-6, Linh Trung Ward, Thu Duc District, Thu Duc City, Vietnam 70000.</p>
// <br/>
// <p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">Tired of receiving too many emails? You can completely cancel the notification through the bell button on the home page of MEmories</p>
// <br/>
// <p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">Contact: katyperrycbt@gmail.com</p>
// `;
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
		for (let i = 0; i < invitationObjects.length; i++) {
			invitationCodes.push(invitationObjects[i]['invitationCode']);
		}
		if (invitationCodes.includes(invitationCode)) {
			const existingUser = await User.findOne({ email });

			if (existingUser) return res.status(400).json({ message: 'User already exist.' });

			if (password !== confirmPassword) return res.status.json({ message: 'Passwords do not match.' });

			const hasedPassword = await bcrypt.hash(password, 12);
			let avtLink = '';
			await cloudinary.v2.uploader.upload(avt)
				.then((result) => {
					console.log(result.url);
					avtLink = result.url;
				}).catch((error) => {
					console.log(error);
				});

			const result = await User.create({ email, password: hasedPassword, name: `${firstName} ${lastName}`, avt: avtLink, ggId: (ggId || '') });

			const token = jwt.sign({ email: result.email, id: result._id }, 'MEmemories', { expiresIn: "1h" });
			
			await Invitation.deleteMany({invitationCode: invitationCode});

			res.status(200).json({ result, token });
		} else {
			res.status(400).json({ message: 'Incorrect invitation code!' });
		}

	} catch (error) {

		res.status(500).json({ message: 'Something went wrong.' })

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
					const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
					if (us.info.subcribe) {
						const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
						console.log(subcribe);
						const subcribeFilter = subcribe.emailList.filter((email) => email !== us.email);
						const html = profileTemplate(us.avt.splice(4, 0, 's'), us.name, us.email);
						const emailForm = {
							to: subcribeFilter,
							subject: `${us.name} updated their profile!`,
							html: html
						}
						sendMail(emailForm.to, emailForm.subject, emailForm.html);
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
					const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
					if (us.info.subcribe) {
						const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
						console.log(subcribe);
						const subcribeFilter = subcribe.emailList.filter((email) => email !== us.email);
						const html = profileTemplate(avtLink.splice(4, 0, 's'), us.name, us.email);
						const emailForm = {
							to: subcribeFilter,
							subject: `${us.name} updated their avatar!`,
							html: html
						}
						sendMail(emailForm.to, emailForm.subject, emailForm.html);
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

	if (!userId) return res.json({ message: 'Unauthenticated' });

	try {
		let oldProfile
		if (mongoose.Types.ObjectId.isValid(userId)) {
			oldProfile = await User.findById(userId);
		} else {
			oldProfile = await User.findOne({ ggId: userId });
		}

		const subcribe = oldProfile?.info?.subcribe ? oldProfile.info.subcribe : false;

		if (subcribe === false) {
			oldProfile.info.subcribe = true;
		} else {
			oldProfile.info.subcribe = false;
		}

		const updatedProfile = await User.findByIdAndUpdate(userId, oldProfile, { new: true });

		res.status(200).json(updatedProfile);
	} catch (error) {
		res.status(409).json({ message: error.message });
	}
}