import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../lib/auth';

const prisma = new PrismaClient();

const shows = [
  {
    title: 'Daily Devotionals',
    host: 'Pastor David',
    description: 'Start your day in God\'s Word with scripture-based reflections for spiritual transformation and preparation for eternity.',
    image: '/gradient-1.jpg',
    schedule: 'Mon-Fri 7am',
    category: 'Devotions',
  },
  {
    title: 'Bible Study & Prayer',
    host: 'Rev. Sarah',
    description: 'Deep dive into Scripture, explore biblical truth, and intercede for revival, awakening, and Christ\'s imminent return.',
    image: '/gradient-2.jpg',
    schedule: 'Wed 7pm',
    category: 'Study',
  },
  {
    title: 'Young Believers',
    host: 'Joshua Ministry Team',
    description: 'Equipping the next generation to live radically for Jesus, share the Gospel boldly, and stand for Christ in dark times.',
    image: '/gradient-3.jpg',
    schedule: 'Sat 10am',
    category: 'Youth',
  },
  {
    title: 'Women\'s Fellowship & Growth',
    host: 'Pastor\'s Wife Helen',
    description: 'Biblical womanhood, prayer, faith testimonies, and encouragement for women on their journey to Christ likeness.',
    image: '/gradient-4.jpg',
    schedule: 'Tue & Thu 2pm',
    category: 'Women',
  },
  {
    title: 'Testimonies of Grace',
    host: 'Various Guests',
    description: 'Real stories of transformation, redemption, and God\'s healing power in the lives of those who encountered Jesus.',
    image: '/gradient-5.jpg',
    schedule: 'Fri 6pm',
    category: 'Testimonies',
  },
  {
    title: 'End Times & Prophecy',
    host: 'Pastor Michael',
    description: 'Exploring biblical prophecy, the signs of Christ\'s return, and preparing your heart for eternity with Jesus.',
    image: '/gradient-6.jpg',
    schedule: 'Sun 7pm',
    category: 'Prophecy',
  },
];

const articles = [
  {
    title: 'Signs of the Times: Jesus is Coming Soon',
    excerpt: 'Biblical prophecy fulfilled and end-times events unfolding before our eyes. Discover what Scripture reveals about Christ\'s imminent return and the importance of spiritual readiness.',
    date: new Date('2024-03-03'),
    category: 'Scripture',
    featured: true,
  },
  {
    title: 'Testimony: From Darkness to Light - A Life Transformed',
    excerpt: 'Hear the powerful story of how one man encountered Jesus Christ and experienced complete spiritual transformation. His journey from despair to hope will inspire your faith.',
    date: new Date('2024-02-28'),
    category: 'Testimonies',
    featured: true,
  },
  {
    title: 'The Gospel Message: Jesus Saves - Understanding Salvation',
    excerpt: 'Explore the foundational truth of salvation through Christ\'s sacrifice. Learn why surrendering your life to Jesus is the most important decision you\'ll ever make.',
    date: new Date('2024-02-25'),
    category: 'Gospel',
    featured: false,
  },
  {
    title: 'Revival is Coming: The Power of Corporate Prayer',
    excerpt: 'God\'s desire for His people is spiritual awakening. Join us as we explore how united, believing prayer releases God\'s power for revival in our churches and nations.',
    date: new Date('2024-02-20'),
    category: 'Prayer',
    featured: false,
  },
  {
    title: 'Freedom in Christ: Breaking Chains of Addiction',
    excerpt: 'A gripping testimony of deliverance from addiction through Christ\'s power. Discover how Jesus broke the chains and set a captive free through the Gospel.',
    date: new Date('2024-02-15'),
    category: 'Testimonies',
    featured: false,
  },
  {
    title: 'Who Am I in Christ? Understanding Your Identity in Jesus',
    excerpt: 'Explore the biblical truth of your identity as a child of God. Learn how understanding your position in Christ brings confidence, purpose, and transformational change.',
    date: new Date('2024-02-10'),
    category: 'Scripture',
    featured: false,
  },
  {
    title: 'Light FM Community: Serving Jesus in Our City',
    excerpt: 'See how our church family is reaching souls with the Gospel, caring for the poor, and sharing Christ\'s love throughout our community with compassion and truth.',
    date: new Date('2024-02-05'),
    category: 'Community',
    featured: false,
  },
  {
    title: 'Spiritual Discernment in a Deceived World',
    excerpt: 'False doctrines and spiritual deception abound. Discover biblical discernment tools to test all things against God\'s Word and remain rooted in Christ.',
    date: new Date('2024-01-30'),
    category: 'Scripture',
    featured: false,
  },
  {
    title: 'Testimonies of Prayer: How God Answers the Cries of His People',
    excerpt: 'Real stories of answered prayer that reveal God\'s faithfulness, power, and care. These testimonies will strengthen your faith and encourage persistent intercession.',
    date: new Date('2024-01-25'),
    category: 'Prayer',
    featured: false,
  },
];

async function main() {
  console.log('Seeding database...');

  // Create default admin
  await prisma.admin.upsert({
    where: { email: 'admin@lightfmradio.org' },
    update: {},
    create: {
      email: 'admin@lightfmradio.org',
      password: hashPassword('admin123'),
      name: 'Admin User',
    },
  });

  for (const show of shows) {
    await prisma.show.create({ data: show });
  }

  for (const article of articles) {
    await prisma.article.create({ data: article });
  }

  console.log('Seeding completed!');
  console.log('Default admin: admin@lightfmradio.org / admin123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
