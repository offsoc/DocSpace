/*
 *
 * (c) Copyright Ascensio System Limited 2010-2018
 *
 * This program is freeware. You can redistribute it and/or modify it under the terms of the GNU 
 * General Public License (GPL) version 3 as published by the Free Software Foundation (https://www.gnu.org/copyleft/gpl.html). 
 * In accordance with Section 7(a) of the GNU GPL its Section 15 shall be amended to the effect that 
 * Ascensio System SIA expressly excludes the warranty of non-infringement of any third-party rights.
 *
 * THIS PROGRAM IS DISTRIBUTED WITHOUT ANY WARRANTY; WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE. For more details, see GNU GPL at https://www.gnu.org/copyleft/gpl.html
 *
 * You can contact Ascensio System SIA by email at sales@onlyoffice.com
 *
 * The interactive user interfaces in modified source and object code versions of ONLYOFFICE must display 
 * Appropriate Legal Notices, as required under Section 5 of the GNU GPL version 3.
 *
 * Pursuant to Section 7 § 3(b) of the GNU GPL you must retain the original ONLYOFFICE logo which contains 
 * relevant author attributions when distributing the software. If the display of the logo in its graphic 
 * form is not reasonably feasible for technical reasons, you must include the words "Powered by ONLYOFFICE" 
 * in every copy of the program you distribute. 
 * Pursuant to Section 7 § 3(e) we decline to grant you any rights under trademark law for use of our trademarks.
 *
*/


using System;
using System.Text.Json.Serialization;

using ASC.Common;
using ASC.Core.Common.Settings;

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace ASC.Web.CRM.Classes
{
    public class SMTPServerSetting
    {
        public SMTPServerSetting()
        {
        }

        public SMTPServerSetting(ASC.Core.Configuration.SmtpSettings smtpSettings)
        {
            Host = smtpSettings.Host;
            Port = smtpSettings.Port;
            EnableSSL = smtpSettings.EnableSSL;
            RequiredHostAuthentication = smtpSettings.EnableAuth;
            HostLogin = smtpSettings.CredentialsUserName;
            HostPassword = smtpSettings.CredentialsUserPassword;
            SenderDisplayName = smtpSettings.SenderDisplayName;
            SenderEmailAddress = smtpSettings.SenderAddress;
        }


        public String Host { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public bool RequiredHostAuthentication { get; set; }
        public String HostLogin { get; set; }
        public String HostPassword { get; set; }
        public String SenderDisplayName { get; set; }
        public String SenderEmailAddress { get; set; }

    }

    [Scope]
    public class InvoiceSetting
    {
        public InvoiceSetting()
        {
                
        }

        public InvoiceSetting(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public InvoiceSetting DefaultSettings
        {
            get
            {
                return new InvoiceSetting(Configuration)
                {
                    Autogenerated = true,
                    Prefix = Configuration["crm:invoice:prefix"] ?? "INV-",
                    Number = "0000001",
                    Terms = String.Empty,
                    CompanyName = String.Empty,
                    CompanyLogoID = 0,
                    CompanyAddress = String.Empty
                };
            }
        }


        public bool Autogenerated { get; set; }
        public String Prefix { get; set; }
        public String Number { get; set; }
        public String Terms { get; set; }
        public String CompanyName { get; set; }
        public Int32 CompanyLogoID { get; set; }
        public String CompanyAddress { get; set; }
    }

    public class CrmSettings : ISettings
    {
        public CrmSettings()
        {
                
        }

        public Guid ID
        {
            get { return new Guid("fdf39b9a-ec96-4eb7-aeab-63f2c608eada"); }
        }

        [JsonPropertyName("SMTPServerSetting")]
        public SMTPServerSetting SMTPServerSettingOld { get; set; }
        public InvoiceSetting InvoiceSetting { get; set; }
        public Guid WebFormKey { get; set; }

        [JsonPropertyName("DefaultCurrency")]
        public String DefaultCurrency { get; set; }
     
        [JsonPropertyName("ChangeContactStatusGroupAuto")]
        public string ChangeContactStatusGroupAutoDto { get; set; }

        [JsonIgnore]
        public Boolean? ChangeContactStatusGroupAuto
        {
            get { return string.IsNullOrEmpty(ChangeContactStatusGroupAutoDto) ? null : (bool?)bool.Parse(ChangeContactStatusGroupAutoDto); }
            set { ChangeContactStatusGroupAutoDto = value.HasValue ? value.Value.ToString().ToLowerInvariant() : null; }
        }

        [JsonPropertyName("AddTagToContactGroupAuto")]
        public string AddTagToContactGroupAutoDto { get; set; }

        [JsonIgnore]
        public Boolean? AddTagToContactGroupAuto
        {
            get { return string.IsNullOrEmpty(AddTagToContactGroupAutoDto) ? null : (bool?)bool.Parse(AddTagToContactGroupAutoDto); }
            set { AddTagToContactGroupAutoDto = value.HasValue ? value.Value.ToString().ToLowerInvariant() : null; }
        }

        [JsonPropertyName("WriteMailToHistoryAuto")]
        public Boolean WriteMailToHistoryAuto { get; set; }

        [JsonPropertyName("IsConfiguredPortal")]
        public bool IsConfiguredPortal { get; set; }

        [JsonPropertyName("IsConfiguredSmtp")]
        public bool IsConfiguredSmtp { get; set; }
        public ISettings GetDefault(IServiceProvider serviceProvider)
        {
            var currencyProvider = serviceProvider.GetService<CurrencyProvider>();
            var configuration = serviceProvider.GetService<IConfiguration>();
            
            var languageName = System.Threading.Thread.CurrentThread.CurrentCulture.TwoLetterISOLanguageName;

            var findedCurrency = currencyProvider.GetAll().Find(item => String.Compare(item.CultureName, languageName, true) == 0);

            return new CrmSettings()
            {
                DefaultCurrency = findedCurrency != null ? findedCurrency.Abbreviation : "USD",
                IsConfiguredPortal = false,
                ChangeContactStatusGroupAuto = null,
                AddTagToContactGroupAuto = null,
                WriteMailToHistoryAuto = false,
                WebFormKey = Guid.Empty,
                InvoiceSetting = new InvoiceSetting(configuration).DefaultSettings
            };
        }
    }

    public class CrmReportSampleSettings : ISettings
    {
        [JsonPropertyName("NeedToGenerate")]
        public bool NeedToGenerate { get; set; }

        public Guid ID
        {
            get { return new Guid("{54CD64AD-E73B-45A3-89E4-4D42A234D7A3}"); }
        }

        public ISettings GetDefault(IServiceProvider serviceProvider)
        {
            return new CrmReportSampleSettings { NeedToGenerate = true };
        }
    }
}