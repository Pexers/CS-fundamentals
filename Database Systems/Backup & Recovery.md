<h1 align='center'>Transactions</h1>

Copyright &copy; 2025, Pexers (https://github.com/Pexers)

> [!NOTE]
> Work in progress.

## Backup & Recovery in Database Systems

Backup and recovery are essential processes to protect data from loss, corruption, or disasters. They ensure business continuity and data integrity in case of hardware failure, human error, cyberattacks, or other incidents.

### Backup Strategies
- **Full Backup:** Copies the entire database. Simple but can be time-consuming and storage-intensive.
- **Incremental Backup:** Only backs up data changed since the last backup (full or incremental). Saves time and space.
- **Differential Backup:** Backs up all changes since the last full backup. Faster recovery than incremental, but larger backup size.
- **Continuous Backup:** Real-time or near-real-time backup of changes, often used for mission-critical systems.

### Recovery Techniques
- **Restore from Backup:** Rebuild the database from backup files after a failure.
- **Point-in-Time Recovery:** Restore the database to a specific moment using transaction logs and backups.
- **Replication:** Use standby or replica databases for quick failover and minimal downtime.

### Best Practices
- Schedule regular backups and test recovery procedures.
- Store backups in multiple locations (on-site and off-site/cloud).
- Encrypt backup files to protect sensitive data.
- Monitor backup jobs and verify backup integrity.
- Document backup and recovery policies.

### Common Tools
- **mysqldump, pg_dump:** Command-line tools for MySQL and PostgreSQL backups.
- **Oracle RMAN:** Oracle’s Recovery Manager for backup and recovery.
- **Cloud Services:** AWS RDS snapshots, Azure SQL Database backups, Google Cloud SQL backups.

Proper backup and recovery planning is critical for minimizing data loss and downtime in database systems.
