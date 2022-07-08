// <auto-generated />
using System;
using ASC.Core.Common.EF.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASC.Core.Common.Migrations.PostgreSql.DbContextPostgreSql
{
    [DbContext(typeof(PostgreSqlDbContext))]
    partial class PostgreSqlDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbipLocation", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("AddrType")
                        .IsRequired()
                        .HasColumnType("enum('ipv4','ipv6')")
                        .HasColumnName("addr_type")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("city")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("varchar(2)")
                        .HasColumnName("country")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("District")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("district")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int?>("GeonameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("geoname_id")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("IPEnd")
                        .IsRequired()
                        .HasColumnType("varchar(39)")
                        .HasColumnName("ip_end")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("IPStart")
                        .IsRequired()
                        .HasColumnType("varchar(39)")
                        .HasColumnName("ip_start")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<float?>("Latitude")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("float")
                        .HasColumnName("latitude")
                        .HasDefaultValueSql("NULL");

                    b.Property<float?>("Longitude")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("float")
                        .HasColumnName("longitude")
                        .HasDefaultValueSql("NULL");

                    b.Property<int>("Processed")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("processed")
                        .HasDefaultValueSql("'1'");

                    b.Property<string>("StateProv")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("stateprov")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("TimezoneName")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("timezone_name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int?>("TimezoneOffset")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("timezone_offset")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("ZipCode")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("zipcode")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("Id");

                    b.HasIndex("IPStart")
                        .HasDatabaseName("ip_start");

                    b.ToTable("dbip_location", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.MobileAppInstall", b =>
                {
                    b.Property<string>("UserEmail")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("user_email")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("AppType")
                        .HasColumnType("int")
                        .HasColumnName("app_type");

                    b.Property<DateTime?>("LastSign")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("datetime")
                        .HasColumnName("last_sign")
                        .HasDefaultValueSql("NULL");

                    b.Property<DateTime>("RegisteredOn")
                        .HasColumnType("datetime")
                        .HasColumnName("registered_on");

                    b.HasKey("UserEmail", "AppType")
                        .HasName("PRIMARY");

                    b.ToTable("mobile_app_install", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.Regions", b =>
                {
                    b.Property<string>("Region")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConnectionString")
                        .HasColumnType("longtext");

                    b.Property<string>("Provider")
                        .HasColumnType("longtext");

                    b.HasKey("Region");

                    b.ToTable("Regions");

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });
#pragma warning restore 612, 618
        }
    }
}
