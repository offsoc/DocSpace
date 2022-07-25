// <auto-generated />
using System;
using ASC.Core.Common.EF.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ASC.Migrations.PostgreSql.Migrations
{
    [DbContext(typeof(WebstudioDbContext))]
    [Migration("20220725110959_WebstudioDbContextMigrate")]
    partial class WebstudioDbContextMigrate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn)
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbTenant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id")
                        .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("alias");

                    b.Property<bool>("Calls")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasColumnName("calls")
                        .HasDefaultValueSql("true");

                    b.Property<DateTime>("CreationDateTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("creationdatetime");

                    b.Property<int>("Industry")
                        .HasColumnType("integer")
                        .HasColumnName("industry");

                    b.Property<string>("Language")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(10)
                        .HasColumnType("character(10)")
                        .HasColumnName("language")
                        .HasDefaultValueSql("'en-US'")
                        .IsFixedLength();

                    b.Property<DateTime>("LastModified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.Property<string>("MappedDomain")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(100)
                        .HasColumnType("character varying(100)")
                        .HasColumnName("mappeddomain")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255)
                        .HasColumnType("character varying(255)")
                        .HasColumnName("name");

                    b.Property<Guid?>("OwnerId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(38)
                        .HasColumnType("uuid")
                        .HasColumnName("owner_id")
                        .HasDefaultValueSql("NULL");

                    b.Property<string>("PaymentId")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(38)
                        .HasColumnType("character varying(38)")
                        .HasColumnName("payment_id")
                        .HasDefaultValueSql("NULL");

                    b.Property<bool>("Spam")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("boolean")
                        .HasColumnName("spam")
                        .HasDefaultValueSql("true");

                    b.Property<int>("Status")
                        .HasColumnType("integer")
                        .HasColumnName("status");

                    b.Property<DateTime?>("StatusChanged")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("statuschanged");

                    b.Property<string>("TimeZone")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("timezone")
                        .HasDefaultValueSql("NULL");

                    b.Property<int>("TrustedDomainsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("trusteddomainsenabled")
                        .HasDefaultValueSql("1");

                    b.Property<string>("TrustedDomainsRaw")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(1024)
                        .HasColumnType("character varying(1024)")
                        .HasColumnName("trusteddomains")
                        .HasDefaultValueSql("NULL");

                    b.Property<int>("Version")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("version")
                        .HasDefaultValueSql("2");

                    b.Property<DateTime?>("Version_Changed")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("version_changed");

                    b.HasKey("Id");

                    b.HasIndex("Alias")
                        .IsUnique()
                        .HasDatabaseName("alias");

                    b.HasIndex("LastModified")
                        .HasDatabaseName("last_modified_tenants_tenants");

                    b.HasIndex("MappedDomain")
                        .HasDatabaseName("mappeddomain");

                    b.HasIndex("Version")
                        .HasDatabaseName("version");

                    b.ToTable("tenants_tenants", "onlyoffice");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Alias = "localhost",
                            Calls = false,
                            CreationDateTime = new DateTime(2021, 3, 9, 17, 46, 59, 97, DateTimeKind.Utc).AddTicks(4317),
                            Industry = 0,
                            LastModified = new DateTime(2022, 7, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Web Office",
                            OwnerId = new Guid("66faa6e4-f133-11ea-b126-00ffeec8b4ef"),
                            Spam = false,
                            Status = 0,
                            TrustedDomainsEnabled = 0,
                            Version = 0
                        });
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioIndex", b =>
                {
                    b.Property<string>("IndexName")
                        .HasMaxLength(50)
                        .HasColumnType("character varying(50)")
                        .HasColumnName("index_name");

                    b.Property<DateTime>("LastModified")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("last_modified")
                        .HasDefaultValueSql("CURRENT_TIMESTAMP");

                    b.HasKey("IndexName")
                        .HasName("webstudio_index_pkey");

                    b.ToTable("webstudio_index", "onlyoffice");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioSettings", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("integer")
                        .HasColumnName("TenantID");

                    b.Property<Guid>("Id")
                        .HasMaxLength(64)
                        .HasColumnType("uuid")
                        .HasColumnName("ID");

                    b.Property<Guid>("UserId")
                        .HasMaxLength(64)
                        .HasColumnType("uuid")
                        .HasColumnName("UserID");

                    b.Property<string>("Data")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("TenantId", "Id", "UserId")
                        .HasName("webstudio_settings_pkey");

                    b.HasIndex("Id")
                        .HasDatabaseName("ID");

                    b.ToTable("webstudio_settings", "onlyoffice");

                    b.HasData(
                        new
                        {
                            TenantId = 1,
                            Id = new Guid("9a925891-1f92-4ed7-b277-d6f649739f06"),
                            UserId = new Guid("00000000-0000-0000-0000-000000000000"),
                            Data = "{\"Completed\":false}"
                        });
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbWebstudioUserVisit", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("integer")
                        .HasColumnName("tenantid");

                    b.Property<DateTime>("VisitDate")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("visitdate");

                    b.Property<Guid>("ProductId")
                        .HasMaxLength(38)
                        .HasColumnType("uuid")
                        .HasColumnName("productid");

                    b.Property<Guid>("UserId")
                        .HasMaxLength(38)
                        .HasColumnType("uuid")
                        .HasColumnName("userid");

                    b.Property<DateTime?>("FirstVisitTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("firstvisittime");

                    b.Property<DateTime?>("LastVisitTime")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("lastvisittime");

                    b.Property<int>("VisitCount")
                        .HasColumnType("integer")
                        .HasColumnName("visitcount");

                    b.HasKey("TenantId", "VisitDate", "ProductId", "UserId")
                        .HasName("webstudio_uservisit_pkey");

                    b.HasIndex("VisitDate")
                        .HasDatabaseName("visitdate");

                    b.ToTable("webstudio_uservisit", "onlyoffice");
                });
#pragma warning restore 612, 618
        }
    }
}
