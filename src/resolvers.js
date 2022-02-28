const now = new Date(Date.now()).toISOString();

const productUnits = [
  {
    header: {
      id: "1",
      itemType: "product/v1",
      createdTimeUtc: now,
      modifiedTimeUtc: now,
    },
    data: {
      productId: "7b96e0a3-27e9-4b0b-9974-28818a08112a",
      revision: "1.1.1",
      serialNumber: "75001851",
      imei: "359780080814738",
      firmware: "1.3.0",
      lotNumber: "003",
    },
  },
];

const getProductUnit = (productUnitId, imei, serialNumber) => {
  if (
    (productUnitId && imei && serialNumber) ||
    (productUnitId && serialNumber) ||
    (productUnitId && serialNumber) ||
    (imei && serialNumber)
  ) {
    throw new Error(
      "Only one identifier is allowed when querying product units."
    );
  }
  return productUnits.find((pu) => pu.header.id === productUnitId);
};

module.exports = { getProductUnit };
