// <auto-generated />
using System;
using ASC.Files.Core.EF;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASC.Files.Core.Migrations.PostgreSql.FilesDbContextPostgreSql
{
    [DbContext(typeof(PostgreSqlFilesDbContext))]
    partial class PostgreSqlFilesDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.Core.Common.EF.DbQuota", b =>
                {
                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.Property<int>("ActiveUsers")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("active_users")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("AvangateId")
                        .HasColumnType("varchar(128)")
                        .HasColumnName("avangate_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Description")
                        .HasColumnType("varchar(128)")
                        .HasColumnName("description")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Features")
                        .HasColumnType("text")
                        .HasColumnName("features")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<long>("MaxFileSize")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("max_file_size")
                        .HasDefaultValueSql("'0'");

                    b.Property<long>("MaxTotalSize")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("max_total_size")
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

                    b.Property<int>("Visible")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
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
                            ActiveUsers = 10000,
                            AvangateId = "0",
                            Features = "domain,audit,controlpanel,healthcheck,ldap,sso,whitelabel,branding,ssbranding,update,support,portals:10000,discencryption,privacyroom,restore",
                            MaxFileSize = 102400L,
                            MaxTotalSize = 10995116277760L,
                            Name = "default",
                            Price = 0.00m,
                            Visible = 0
                        });
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

                    b.Property<int>("Quantity")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("quantity")
                        .HasDefaultValueSql("'1'");

                    b.Property<DateTime>("Stamp")
                        .HasColumnType("datetime")
                        .HasColumnName("stamp");

                    b.Property<int>("Tariff")
                        .HasColumnType("int")
                        .HasColumnName("tariff");

                    b.Property<int>("Tenant")
                        .HasColumnType("int")
                        .HasColumnName("tenant");

                    b.HasKey("Id");

                    b.HasIndex("Tenant")
                        .HasDatabaseName("tenant");

                    b.ToTable("tenants_tariff", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Core.Common.EF.Model.DbTenant", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Alias")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("alias")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("Calls")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("calls")
                        .HasDefaultValueSql("'1'");

                    b.Property<DateTime>("CreationDateTime")
                        .HasColumnType("datetime")
                        .HasColumnName("creationdatetime");

                    b.Property<int>("Industry")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("industry")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("Language")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(10)")
                        .HasColumnName("language")
                        .HasDefaultValueSql("'en-US'")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("LastModified")
                        .HasColumnType("timestamp")
                        .HasColumnName("last_modified");

                    b.Property<string>("MappedDomain")
                        .HasColumnType("varchar(100)")
                        .HasColumnName("mappeddomain")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("OwnerId")
                        .IsRequired()
                        .HasColumnType("varchar(38)")
                        .HasColumnName("owner_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("PaymentId")
                        .HasColumnType("varchar(38)")
                        .HasColumnName("payment_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("Spam")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("spam")
                        .HasDefaultValueSql("'1'");

                    b.Property<int>("Status")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("status")
                        .HasDefaultValueSql("'0'");

                    b.Property<DateTime?>("StatusChanged")
                        .HasColumnType("datetime")
                        .HasColumnName("statuschanged");

                    b.Property<string>("TimeZone")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("timezone")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("TrustedDomainsEnabled")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("trusteddomainsenabled")
                        .HasDefaultValueSql("'1'");

                    b.Property<string>("TrustedDomainsRaw")
                        .HasColumnType("varchar(1024)")
                        .HasColumnName("trusteddomains")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("Version")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("version")
                        .HasDefaultValueSql("'2'");

                    b.Property<DateTime?>("Version_Changed")
                        .HasColumnType("datetime")
                        .HasColumnName("version_changed");

                    b.HasKey("Id");

                    b.HasIndex("LastModified")
                        .HasDatabaseName("last_modified");

                    b.HasIndex("MappedDomain")
                        .HasDatabaseName("mappeddomain");

                    b.HasIndex("Version")
                        .HasDatabaseName("version");

                    b.ToTable("tenants_tenants", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Alias = "localhost",
                            Calls = 0,
                            CreationDateTime = new DateTime(2021, 3, 9, 17, 46, 59, 97, DateTimeKind.Utc).AddTicks(4317),
                            LastModified = new DateTime(2022, 7, 8, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Web Office",
                            OwnerId = "66faa6e4-f133-11ea-b126-00ffeec8b4ef",
                            Spam = 0,
                            Status = 0,
                            TrustedDomainsEnabled = 0,
                            Version = 0
                        });
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFile", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<int>("Id")
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<int>("Version")
                        .HasColumnType("int")
                        .HasColumnName("version");

                    b.Property<int>("Category")
                        .HasColumnType("int")
                        .HasColumnName("category");

                    b.Property<string>("Changes")
                        .HasColumnType("mediumtext")
                        .HasColumnName("changes")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Comment")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("comment")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<long>("ContentLength")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("bigint")
                        .HasColumnName("content_length")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("ConvertedType")
                        .HasColumnType("varchar(10)")
                        .HasColumnName("converted_type")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("create_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("CreateOn")
                        .HasColumnType("datetime")
                        .HasColumnName("create_on");

                    b.Property<int>("CurrentVersion")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("current_version")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("Encrypted")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("encrypted")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("FileStatus")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("file_status")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("Forcesave")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("forcesave")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("ModifiedBy")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("modified_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("datetime")
                        .HasColumnName("modified_on");

                    b.Property<int>("ParentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("folder_id")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("ThumbnailStatus")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("thumb")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(400)")
                        .HasColumnName("title")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("VersionGroup")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("version_group")
                        .HasDefaultValueSql("'1'");

                    b.HasKey("TenantId", "Id", "Version")
                        .HasName("PRIMARY");

                    b.HasIndex("Id")
                        .HasDatabaseName("id");

                    b.HasIndex("ModifiedOn")
                        .HasDatabaseName("modified_on");

                    b.HasIndex("ParentId")
                        .HasDatabaseName("folder_id");

                    b.ToTable("files_file", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesBunchObjects", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("RightNode")
                        .HasColumnType("varchar(255)")
                        .HasColumnName("right_node")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("LeftNode")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("left_node")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("TenantId", "RightNode")
                        .HasName("PRIMARY");

                    b.HasIndex("LeftNode")
                        .HasDatabaseName("left_node");

                    b.ToTable("files_bunch_objects", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesLink", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("SourceId")
                        .HasColumnType("varchar(32)")
                        .HasColumnName("source_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("LinkedId")
                        .HasColumnType("varchar(32)")
                        .HasColumnName("linked_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("LinkedFor")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("linked_for")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("TenantId", "SourceId", "LinkedId")
                        .HasName("PRIMARY");

                    b.HasIndex("TenantId", "SourceId", "LinkedId", "LinkedFor")
                        .HasDatabaseName("linked_for");

                    b.ToTable("files_link", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesSecurity", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("EntryId")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("entry_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("EntryType")
                        .HasColumnType("int")
                        .HasColumnName("entry_type");

                    b.Property<string>("Subject")
                        .HasColumnType("char(38)")
                        .HasColumnName("subject")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("owner")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("Share")
                        .HasColumnType("int")
                        .HasColumnName("security");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("timestamp")
                        .HasColumnName("timestamp");

                    b.HasKey("TenantId", "EntryId", "EntryType", "Subject")
                        .HasName("PRIMARY");

                    b.HasIndex("Owner")
                        .HasDatabaseName("owner");

                    b.HasIndex("TenantId", "EntryType", "EntryId", "Owner")
                        .HasDatabaseName("tenant_id");

                    b.ToTable("files_security", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesTag", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Owner")
                        .IsRequired()
                        .HasColumnType("varchar(38)")
                        .HasColumnName("owner")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<int>("Type")
                        .HasColumnType("int")
                        .HasColumnName("flag");

                    b.HasKey("Id");

                    b.HasIndex("TenantId", "Owner", "Name", "Type")
                        .HasDatabaseName("name");

                    b.ToTable("files_tag", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesTagLink", b =>
                {
                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<int>("TagId")
                        .HasColumnType("int")
                        .HasColumnName("tag_id");

                    b.Property<string>("EntryId")
                        .HasColumnType("varchar(32)")
                        .HasColumnName("entry_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("EntryType")
                        .HasColumnType("int")
                        .HasColumnName("entry_type");

                    b.Property<int>("Count")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("tag_count")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("CreateBy")
                        .HasColumnType("char(38)")
                        .HasColumnName("create_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime?>("CreateOn")
                        .HasColumnType("datetime")
                        .HasColumnName("create_on");

                    b.HasKey("TenantId", "TagId", "EntryId", "EntryType")
                        .HasName("PRIMARY");

                    b.HasIndex("CreateOn")
                        .HasDatabaseName("create_on");

                    b.HasIndex("TenantId", "EntryId", "EntryType")
                        .HasDatabaseName("entry_id");

                    b.ToTable("files_tag_link", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesThirdpartyAccount", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<DateTime>("CreateOn")
                        .HasColumnType("datetime")
                        .HasColumnName("create_on");

                    b.Property<int>("FolderType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("folder_type")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("varchar(512)")
                        .HasColumnName("password")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Provider")
                        .IsRequired()
                        .ValueGeneratedOnAdd()
                        .HasColumnType("varchar(50)")
                        .HasColumnName("provider")
                        .HasDefaultValueSql("'0'")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(400)")
                        .HasColumnName("customer_title")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Token")
                        .HasColumnType("text")
                        .HasColumnName("token")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Url")
                        .HasColumnType("text")
                        .HasColumnName("url")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(38)")
                        .HasColumnName("user_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("varchar(100)")
                        .HasColumnName("user_name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("Id");

                    b.ToTable("files_thirdparty_account", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesThirdpartyApp", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(38)")
                        .HasColumnName("user_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("App")
                        .HasColumnType("varchar(50)")
                        .HasColumnName("app")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("timestamp")
                        .HasColumnName("modified_on");

                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("Token")
                        .HasColumnType("text")
                        .HasColumnName("token")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("UserId", "App")
                        .HasName("PRIMARY");

                    b.ToTable("files_thirdparty_app", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFilesThirdpartyIdMapping", b =>
                {
                    b.Property<string>("HashId")
                        .HasColumnType("char(32)")
                        .HasColumnName("hash_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Id")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.HasKey("HashId")
                        .HasName("PRIMARY");

                    b.HasIndex("TenantId", "HashId")
                        .HasDatabaseName("index_1");

                    b.ToTable("files_thirdparty_id_mapping", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFolder", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("id");

                    b.Property<string>("CreateBy")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("create_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("CreateOn")
                        .HasColumnType("datetime")
                        .HasColumnName("create_on");

                    b.Property<int>("FilesCount")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("filesCount")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("FolderType")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("folder_type")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("FoldersCount")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("foldersCount")
                        .HasDefaultValueSql("'0'");

                    b.Property<string>("ModifiedBy")
                        .IsRequired()
                        .HasColumnType("char(38)")
                        .HasColumnName("modified_by")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<DateTime>("ModifiedOn")
                        .HasColumnType("datetime")
                        .HasColumnName("modified_on");

                    b.Property<int>("ParentId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasColumnName("parent_id")
                        .HasDefaultValueSql("'0'");

                    b.Property<int>("TenantId")
                        .HasColumnType("int")
                        .HasColumnName("tenant_id");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("varchar(400)")
                        .HasColumnName("title")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.HasKey("Id");

                    b.HasIndex("ModifiedOn")
                        .HasDatabaseName("modified_on");

                    b.HasIndex("TenantId", "ParentId")
                        .HasDatabaseName("parent_id");

                    b.ToTable("files_folder", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });

            modelBuilder.Entity("ASC.Files.Core.EF.DbFolderTree", b =>
                {
                    b.Property<int>("ParentId")
                        .HasColumnType("int")
                        .HasColumnName("parent_id");

                    b.Property<int>("FolderId")
                        .HasColumnType("int")
                        .HasColumnName("folder_id");

                    b.Property<int>("Level")
                        .HasColumnType("int")
                        .HasColumnName("level");

                    b.HasKey("ParentId", "FolderId")
                        .HasName("PRIMARY");

                    b.HasIndex("FolderId")
                        .HasDatabaseName("folder_id");

                    b.ToTable("files_folder_tree", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });
#pragma warning restore 612, 618
        }
    }
}
