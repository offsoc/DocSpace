﻿// (c) Copyright Ascensio System SIA 2010-2022
//
// This program is a free software product.
// You can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License (AGPL) version 3 as published by the Free Software
// Foundation. In accordance with Section 7(a) of the GNU AGPL its Section 15 shall be amended
// to the effect that Ascensio System SIA expressly excludes the warranty of non-infringement of
// any third-party rights.
//
// This program is distributed WITHOUT ANY WARRANTY, without even the implied warranty
// of MERCHANTABILITY or FITNESS FOR A PARTICULAR  PURPOSE. For details, see
// the GNU AGPL at: http://www.gnu.org/licenses/agpl-3.0.html
//
// You can contact Ascensio System SIA at Lubanas st. 125a-25, Riga, Latvia, EU, LV-1021.
//
// The  interactive user interfaces in modified source and object code versions of the Program must
// display Appropriate Legal Notices, as required under Section 5 of the GNU AGPL version 3.
//
// Pursuant to Section 7(b) of the License you must retain the original Product logo when
// distributing the program. Pursuant to Section 7(e) we decline to grant you any rights under
// trademark law for use of our trademarks.
//
// All the Product's GUI elements, including illustrations and icon sets, as well as technical writing
// content are licensed under the terms of the Creative Commons Attribution-ShareAlike 4.0
// International. See the License terms at http://creativecommons.org/licenses/by-sa/4.0/legalcode

namespace ASC.Core.Common.EF.Model;

public class DbCoreSettings : BaseEntity
{
    public int Tenant { get; set; }
    public string Id { get; set; }
    public byte[] Value { get; set; }
    public DateTime LastModified { get; set; }

    public override object[] GetKeys()
    {
        return new object[] { Tenant, Id };
    }
}

public static class CoreSettingsExtension
{
    public static ModelBuilderWrapper AddCoreSettings(this ModelBuilderWrapper modelBuilder)
    {
        modelBuilder
            .Add(MySqlAddCoreSettings, Provider.MySql)
            .Add(PgSqlAddCoreSettings, Provider.PostgreSql)
            .HasData(
                new DbCoreSettings { Tenant = -1, Id = "CompanyWhiteLabelSettings", Value = new byte[] { 245, 71, 4, 138, 72, 101, 23, 21, 135, 217, 206, 188, 138, 73, 108, 96, 29, 150, 3, 31, 44, 28, 62, 145, 96, 53, 57, 66, 238, 118, 93, 172, 211, 22, 244, 181, 244, 40, 146, 67, 111, 196, 162, 27, 154, 109, 248, 255, 211, 188, 64, 54, 180, 126, 58, 90, 27, 76, 136, 27, 38, 96, 152, 105, 254, 187, 104, 72, 189, 136, 192, 46, 234, 198, 164, 204, 179, 232, 244, 4, 41, 8, 18, 240, 230, 225, 36, 165, 82, 190, 129, 165, 140, 100, 187, 139, 211, 201, 168, 192, 237, 225, 249, 66, 18, 129, 222, 12, 122, 248, 39, 51, 164, 188, 229, 21, 232, 86, 148, 196, 221, 167, 142, 34, 101, 43, 162, 137, 31, 206, 149, 120, 249, 114, 133, 168, 30, 18, 254, 223, 93, 101, 88, 97, 30, 58, 163, 224, 62, 173, 220, 170, 152, 40, 124, 100, 165, 81, 7, 87, 168, 129, 176, 12, 51, 69, 230, 252, 30, 34, 182, 7, 202, 45, 117, 60, 99, 241, 237, 148, 201, 35, 102, 219, 160, 228, 194, 230, 219, 22, 244, 74, 138, 176, 145, 0, 122, 167, 80, 93, 23, 228, 21, 48, 100, 60, 31, 250, 232, 34, 248, 249, 159, 210, 227, 12, 13, 239, 130, 223, 101, 196, 51, 36, 80, 127, 62, 92, 104, 228, 197, 226, 43, 232, 164, 12, 36, 66, 52, 133 }, LastModified = new DateTime(2022, 7, 8) },
                new DbCoreSettings { Tenant = -1, Id = "FullTextSearchSettings", Value = new byte[] { 8, 120, 207, 5, 153, 181, 23, 202, 162, 211, 218, 237, 157, 6, 76, 62, 220, 238, 175, 67, 31, 53, 166, 246, 66, 220, 173, 160, 72, 23, 227, 81, 50, 39, 187, 177, 222, 110, 43, 171, 235, 158, 16, 119, 178, 207, 49, 140, 72, 152, 20, 84, 94, 135, 117, 1, 246, 51, 251, 190, 148, 2, 44, 252, 221, 2, 91, 83, 149, 151, 58, 245, 16, 148, 52, 8, 187, 86, 150, 46, 227, 93, 163, 95, 47, 131, 116, 207, 95, 209, 38, 149, 53, 148, 73, 215, 206, 251, 194, 199, 189, 17, 42, 229, 135, 82, 23, 154, 162, 165, 158, 94, 23, 128, 30, 88, 12, 204, 96, 250, 236, 142, 189, 211, 214, 18, 196, 136, 102, 102, 217, 109, 108, 240, 96, 96, 94, 100, 201, 10, 31, 170, 128, 192 }, LastModified = new DateTime(2022, 7, 8) },
                new DbCoreSettings { Tenant = -1, Id = "SmtpSettings", Value = new byte[] { 240, 82, 224, 144, 161, 163, 117, 13, 173, 205, 78, 153, 97, 218, 4, 170, 81, 239, 1, 151, 226, 192, 98, 60, 241, 44, 88, 56, 191, 164, 10, 155, 72, 186, 239, 203, 227, 113, 88, 119, 49, 215, 227, 220, 158, 124, 96, 9, 116, 47, 158, 65, 93, 86, 219, 15, 10, 224, 142, 50, 248, 144, 75, 44, 68, 28, 198, 87, 198, 69, 67, 234, 238, 38, 32, 68, 162, 139, 67, 53, 220, 176, 240, 196, 233, 64, 29, 137, 31, 160, 99, 105, 249, 132, 202, 45, 71, 92, 134, 194, 55, 145, 121, 97, 197, 130, 119, 105, 131, 21, 133, 35, 10, 102, 172, 119, 135, 230, 251, 86, 253, 62, 55, 56, 146, 103, 164, 106 }, LastModified = new DateTime(2022, 7, 8) }
            );

        return modelBuilder;
    }

    public static void MySqlAddCoreSettings(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DbCoreSettings>(entity =>
        {
            entity.HasKey(e => new { e.Tenant, e.Id })
                .HasName("PRIMARY");

            entity.ToTable("core_settings")
                .HasCharSet("utf8");

            entity.Property(e => e.Tenant).HasColumnName("tenant");

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .HasColumnType("varchar(128)")
                .HasCharSet("utf8")
                .UseCollation("utf8_general_ci");

            entity.Property(e => e.LastModified)
                .HasColumnName("last_modified")
                .HasColumnType("timestamp");

            entity.Property(e => e.Value)
                .IsRequired()
                .HasColumnName("value")
                .HasColumnType("mediumblob");
        });
    }
    public static void PgSqlAddCoreSettings(this ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<DbCoreSettings>(entity =>
        {
            entity.HasKey(e => new { e.Tenant, e.Id })
                .HasName("core_settings_pkey");

            entity.ToTable("core_settings", "onlyoffice");

            entity.Property(e => e.Tenant).HasColumnName("tenant");

            entity.Property(e => e.Id)
                .HasColumnName("id")
                .HasMaxLength(128);

            entity.Property(e => e.LastModified)
                .HasColumnName("last_modified")
                .HasDefaultValueSql("CURRENT_TIMESTAMP");

            entity.Property(e => e.Value)
                .IsRequired()
                .HasColumnName("value");
        });
    }
}
