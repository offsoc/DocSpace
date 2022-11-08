// <auto-generated />
using System;
using ASC.EventBus.Extensions.Logger;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace ASC.Migrations.MySql.Migrations
{
    [DbContext(typeof(IntegrationEventLogContext))]
    partial class IntegrationEventLogContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("ASC.EventBus.Extensions.Logger.IntegrationEventLogEntry", b =>
                {
                    b.Property<string>("EventId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(38)")
                        .HasColumnName("event_id")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<string>("Content")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("content")
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

                    b.Property<string>("EventTypeName")
                        .IsRequired()
                        .HasColumnType("varchar(255)")
                        .HasColumnName("event_type_name")
                        .UseCollation("utf8_general_ci")
                        .HasAnnotation("MySql:CharSet", "utf8");

                    b.Property<int>("State")
                        .HasColumnType("int(11)")
                        .HasColumnName("state");

                    b.Property<int>("TenantId")
                        .HasColumnType("int(11)")
                        .HasColumnName("tenant_id");

                    b.Property<int>("TimesSent")
                        .HasColumnType("int(11)")
                        .HasColumnName("times_sent");

                    b.Property<string>("TransactionId")
                        .HasColumnType("longtext");

                    b.HasKey("EventId")
                        .HasName("PRIMARY");

                    b.HasIndex("TenantId")
                        .HasDatabaseName("tenant_id");

                    b.ToTable("event_bus_integration_event_log", (string)null);

                    b.HasAnnotation("MySql:CharSet", "utf8");
                });
#pragma warning restore 612, 618
        }
    }
}
