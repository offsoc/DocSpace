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
using System.Runtime.Serialization;
using System.Text.Json;

using ASC.Common.Mapping;
using ASC.CRM.Classes;
using ASC.CRM.Core;
using ASC.CRM.Core.Enums;

using AutoMapper;

namespace ASC.CRM.ApiModels
{
    /// <summary>
    ///   Address
    /// </summary>
    [DataContract(Name = "address", Namespace = "")]
    public class Address
    {
        public Address()
        {
        }

        public Address(ContactInfo contactInfo)
        {
            if (contactInfo.InfoType != ContactInfoType.Address) throw new ArgumentException();

            var jsonElement =  JsonDocument.Parse(contactInfo.Data).RootElement;

            City = jsonElement.GetProperty("city").GetString();
            Country = jsonElement.GetProperty("country").GetString();
            State = jsonElement.GetProperty("state").GetString();
            Street = jsonElement.GetProperty("street").GetString();
            Zip = jsonElement.GetProperty("zip").GetString();
            Category = contactInfo.Category;
            CategoryName = contactInfo.CategoryToString();
            IsPrimary = contactInfo.IsPrimary;
        }

        public static bool TryParse(ContactInfo contactInfo, out Address res)
        {
            if (contactInfo.InfoType != ContactInfoType.Address)
            {
                res = null;
                return false;
            }

            try
            {
                res = JsonSerializer.Deserialize<Address>(contactInfo.Data);
                res.Category = contactInfo.Category;
                res.CategoryName = contactInfo.CategoryToString();
                res.IsPrimary = contactInfo.IsPrimary;
                return true;
            }
            catch (Exception)
            {
                res = null;
                return false;
            }
        }

        [DataMember(Order = 1, IsRequired = false, EmitDefaultValue = false)]
        public String Street { get; set; }

        [DataMember(Order = 2, IsRequired = false, EmitDefaultValue = false)]
        public String City { get; set; }

        [DataMember(Order = 3, IsRequired = false, EmitDefaultValue = false)]
        public String State { get; set; }

        [DataMember(Order = 4, IsRequired = false, EmitDefaultValue = false)]
        public String Zip { get; set; }

        [DataMember(Order = 5, IsRequired = false, EmitDefaultValue = false)]
        public String Country { get; set; }

        [DataMember(Order = 6, IsRequired = false, EmitDefaultValue = false)]
        public int Category { get; set; }

        [DataMember(Order = 7, IsRequired = false, EmitDefaultValue = false)]
        public String CategoryName { get; set; }

        [DataMember(Order = 8, IsRequired = false, EmitDefaultValue = false)]
        public Boolean IsPrimary { get; set; }

        public static Address GetSample()
        {
            return new Address
            {
                Country = "Latvia",
                Zip = "LV-1021",
                Street = "Lubanas st. 125a-25",
                State = "",
                City = "Riga",
                IsPrimary = true,
                Category = (int)ContactInfoBaseCategory.Work,
                CategoryName = ((AddressCategory)ContactInfoBaseCategory.Work).ToLocalizedString()
            };
        }
    }

    /// <summary>
    ///   Contact information
    /// </summary>
    [DataContract(Name = "commonDataItem", Namespace = "")]
    public class ContactInfoDto : IMapFrom<ContactInfo>
    {
        public ContactInfoDto()
        {
        }

        [DataMember(Name = "id")]
        public int Id { get; set; }

        [DataMember(Order = 1)]
        public ContactInfoType InfoType { get; set; }

        [DataMember(Order = 2)]
        public int Category { get; set; }

        [DataMember(Order = 3)]
        public String Data { get; set; }

        [DataMember(Order = 4)]
        public String CategoryName { get; set; }

        [DataMember(Order = 5)]
        public bool IsPrimary { get; set; }

        public static ContactInfoDto GetSample()
        {
            return new ContactInfoDto
            {
                IsPrimary = true,
                Category = (int)ContactInfoBaseCategory.Home,
                CategoryName = ContactInfoBaseCategory.Home.ToLocalizedString(),
                Data = "support@onlyoffice.com",
                InfoType = ContactInfoType.Email
            };
        }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ContactInfo, ContactInfoDto>();
        }
    }
}