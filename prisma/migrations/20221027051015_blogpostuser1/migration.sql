-- DropForeignKey
ALTER TABLE `BlogPost` DROP FOREIGN KEY `BlogPost_email_fkey`;

-- AddForeignKey
ALTER TABLE `BlogPost` ADD CONSTRAINT `BlogPost_email_fkey` FOREIGN KEY (`email`) REFERENCES `User`(`email`) ON DELETE RESTRICT ON UPDATE CASCADE;
