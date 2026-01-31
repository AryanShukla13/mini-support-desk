import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.ticket.deleteMany();

  // Create sample tickets
  const ticket1 = await prisma.ticket.create({
    data: {
      title: 'Cannot login to dashboard',
      description: 'I am unable to login to my account dashboard. After entering my credentials, the page just refreshes without any error message. I have tried resetting my password but the issue persists.',
      status: 'OPEN',
      priority: 'HIGH',
      comments: {
        create: [
          {
            authorName: 'Support Agent',
            message: 'Thank you for reporting this issue. We are looking into it and will update you shortly.',
          },
          {
            authorName: 'User',
            message: 'Any update on this? I really need to access my dashboard urgently.',
          },
        ],
      },
    },
  });

  const ticket2 = await prisma.ticket.create({
    data: {
      title: 'Feature request: Dark mode support',
      description: 'It would be great if the application supported a dark mode theme. Many users prefer dark mode for reduced eye strain, especially when working late at night. This is a common feature in modern applications.',
      status: 'IN_PROGRESS',
      priority: 'MEDIUM',
      comments: {
        create: [
          {
            authorName: 'Product Manager',
            message: 'Thanks for the suggestion! We have added this to our roadmap for the next quarter.',
          },
        ],
      },
    },
  });

  const ticket3 = await prisma.ticket.create({
    data: {
      title: 'Slow loading on mobile devices',
      description: 'The application takes a very long time to load on mobile devices, particularly on 4G connections. The initial load can take up to 30 seconds, which is not acceptable for a good user experience. Desktop performance is fine.',
      status: 'RESOLVED',
      priority: 'HIGH',
      comments: {
        create: [
          {
            authorName: 'Developer',
            message: 'We have identified the issue - large unoptimized images were causing the slow load times.',
          },
          {
            authorName: 'Developer',
            message: 'Fixed in version 2.1.0. All images are now optimized and lazy-loaded.',
          },
        ],
      },
    },
  });

  const ticket4 = await prisma.ticket.create({
    data: {
      title: 'Email notifications not working',
      description: 'I have enabled email notifications in my settings, but I am not receiving any emails for new messages, updates, or other activities. I have checked my spam folder and confirmed my email address is correct.',
      status: 'OPEN',
      priority: 'MEDIUM',
    },
  });

  const ticket5 = await prisma.ticket.create({
    data: {
      title: 'Export data to CSV functionality',
      description: 'Please add a feature to export all user data to CSV format. This would be helpful for data analysis and backup purposes. Currently, there is no way to bulk export data from the platform.',
      status: 'OPEN',
      priority: 'LOW',
    },
  });

  const ticket6 = await prisma.ticket.create({
    data: {
      title: 'Payment processing error',
      description: 'When trying to process a payment, I receive an error message saying "Transaction failed - please try again later." This has happened multiple times over the past 24 hours. I have tried different cards and payment methods.',
      status: 'IN_PROGRESS',
      priority: 'HIGH',
      comments: {
        create: [
          {
            authorName: 'Support Lead',
            message: 'We are investigating this with our payment provider. Your issue has been escalated.',
          },
        ],
      },
    },
  });

  const ticket7 = await prisma.ticket.create({
    data: {
      title: 'Documentation needs updating',
      description: 'The API documentation is outdated and references deprecated endpoints. Several code examples return 404 errors. Could you please update the documentation to reflect the current API version?',
      status: 'RESOLVED',
      priority: 'LOW',
      comments: {
        create: [
          {
            authorName: 'Technical Writer',
            message: 'Documentation has been updated to v3.0. All examples have been tested and verified.',
          },
        ],
      },
    },
  });

  const ticket8 = await prisma.ticket.create({
    data: {
      title: 'Two-factor authentication setup issues',
      description: 'I am trying to enable two-factor authentication but the QR code is not displaying properly. The page shows a broken image icon instead of the QR code. I have tried on different browsers with the same result.',
      status: 'OPEN',
      priority: 'MEDIUM',
    },
  });

  console.log('✅ Seed completed successfully!');
  console.log(`Created ${8} tickets with comments`);
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
