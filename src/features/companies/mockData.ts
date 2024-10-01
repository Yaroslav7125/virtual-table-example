function generateCompanies() {
  const companies = [];
  for (let i = 6; i <= 500; i++) {
    companies.push({
      id: i.toString(),
      checked: Math.random() < 0.5, // случайный булевый флаг
      name: `Company ${i}`,
      address: `Street ${i}, City ${i}, Country`,
    });
  }
  return companies;
}

export const companiesMockData = [
  {
    id: "1",
    checked: false,
    name: "Tech Solutions asdasdasd asda sdasda asda sda sda sda sdas",
    address: "1234 Innovation Drive, Silicon Valley, CA",
  },
  {
    id: "2",
    checked: true,
    name: "Green Energy Co.",
    address: "5678 Renewable Way, Austin, TX",
  },
  {
    id: "3",
    checked: false,
    name: "FinTech Group",
    address: "9101 Market Street, New York, NY",
  },
  {
    id: "4",
    checked: false,
    name: "AutoDrive Inc.",
    address: "2468 Motorway Blvd, Detroit, MI",
  },
  {
    id: "5",
    checked: true,
    name: "HealthFirst Systems",
    address: "1357 Medical Park, Chicago, IL",
  },
  ...generateCompanies(),
];
