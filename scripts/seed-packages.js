const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const package1 = {
    title: "Premium Group Experience (30 Pax)",
    duration: "4 Nights / 5 Days",
    groupSize: "30 Persons",
    totalPrice: "₹4,92,000",
    perPerson: "(₹16,400 per person)",
    images: [
      "/images/about_pahalgam_1776581424655.png",
      "/images/gulmarg_snow_1776581444972.png",
      "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80",
      "/images/Gandola.jpg"
    ],
    features: [
      "15 Double Rooms in 4-Star Properties",
      "1 Meeting Hall for Party and Meeting",
      "Daily Breakfast and Dinner",
      "Warm Welcome at Airport",
      "Shikara Ride",
      "ABC: Aru Valley, Betab Valley, Chandanwadi",
      "Pickup and Drop",
      "Extensive Local Sightseeing"
    ]
  };

  const package2 = {
    title: "Intimate Group Escape (10 Pax)",
    duration: "4 Nights / 5 Days",
    groupSize: "10 Persons",
    totalPrice: "₹1,98,000",
    perPerson: "(₹19,800 per person)",
    images: [
      "/images/gulmarg_snow_1776581444972.png",
      "https://images.unsplash.com/photo-1598091383021-15ddea10925d?auto=format&fit=crop&w=800&q=80",
      "/images/hero_kashmir_1776581409040.png",
      "/images/about_pahalgam_1776581424655.png"
    ],
    features: [
      "5 Double Rooms in 4-Star Properties",
      "Daily Breakfast and Dinner",
      "Warm Welcome at Airport",
      "Shikara Ride",
      "ABC: Aru Valley, Betab Valley, Chandanwadi",
      "Pickup and Drop",
      "Extensive Local Sightseeing"
    ]
  };

  console.log('Seeding packages...');

  await prisma.package.create({ data: package1 });
  await prisma.package.create({ data: package2 });

  console.log('Successfully seeded 2 packages!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
