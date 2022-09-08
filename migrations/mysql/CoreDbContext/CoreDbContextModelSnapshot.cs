// <auto-generated />
using System;
using ASC.Core.Common.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASC.Migrations.MySql.Migrations
{
    [DbContext(typeof(CoreDbContext))]
    partial class CoreDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.Core.Common.EF.DbQuota", b =>
                {
                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(128)")
                        .HasColumnName("description")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Features")
                        .HasColumnType("text")
                        .HasColumnName("features");

                    b.Property<long>("MaxFileSize")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("max_file_size")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(128)")
                        .HasColumnName("name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<decimal>("Price")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("decimal(10,2)")
                        .HasColumnName("price")
                        .HasDefaultValueSql("'0.00'");

                    b.Property<string>("ProductId")
                        .HasColumnType("varchar(128)")
                        .HasColumnName("product_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<bool>("Visible")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("tinyint(1)")
                        .HasColumnName("visible")
                        .HasDefaultValueSql("'0'");

                    b.HasKey("Tenant")
                        .HasName("PRIMARY");

                    b.ToTable("tenants_quota", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");

                    b.HasData(
                        new
                        {
                            Tenant = -1,
                            Features = "trial,audit,ldap,sso,whitelabel,restore,total_size:10995116277760,manager:1",
                            MaxFileSize = 100L,
                            Name = "trial",
                            Price = 0.00m,
                            Visible = false
                        },
                        new
                        {
                            Tenant = -2,
                            Features = "audit,ldap,sso,whitelabel,restore,total_size:10995116277760,manager:1",
                            MaxFileSize = 1024L,
                            Name = "admin",
                            Price = 30.00m,
                            ProductId = "1002",
                            Visible = true
                        },
                        new
                        {
                            Tenant = -3,
                            Features = "free,audit,ldap,sso,restore,total_size:2147483648,manager:5,rooms:3",
                            MaxFileSize = 100L,
                            Name = "startup",
                            Price = 0.00m,
                            Visible = false
                        });
                });

            modelBuilder.Entity("ASC.Core.Common.EF.DbQuotaRow", b =>
                {
                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.Property<string>("Path")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("path")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<long>("Counter")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("counter")
                        .HasDefaultValueSql("'0'");

                    b.Property<DateTime>("LastModified")
                        .HasColumnType("timestamp")
                        .HasColumnName("last_modified");

                    b.Property<string>("Tag")
                        .HasColumnType("varchar(1024)")
                        .HasColumnName("tag")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("Tenant", "Path")
                        .HasName("PRIMARY");

                    b.HasIndex("LastModified")
                        .HasDatabaseName("last_modified");

                    b.ToTable("tenants_quotarow", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.DbTariff", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Comment")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("comment")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("CreateOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("create_on");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("varchar(36)")
                        .HasColumnName("customer_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("Stamp")
                        .HasColumnType("datetime")
                        .HasColumnName("stamp");

                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.HasKey("Id");

                    b.HasIndex("Tenant")
                        .HasDatabaseName("tenant");

                    b.ToTable("tenants_tariff", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.DbTariffRow", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int>("Quantity")
                        .HasColumnType("int")
                        .HasColumnName("quantity");

                    b.Property<int>("Quota")
                        .HasColumnType("int")
                        .HasColumnName("quota");

                    b.Property<int>("TariffId")
                        .HasColumnType("int")
                        .HasColumnName("tariff_id");

                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.HasKey("Id")
                        .HasName("PRIMARY");

                    b.ToTable("tenants_tariffrow", (string)null);
                });
#pragma warning restore 612, 618
        }
    }
}
