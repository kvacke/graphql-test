const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLList,
  GraphQLEnumType,
} = require("graphql");
const { getProductUnit } = require("./resolvers");

const now = new Date(Date.now()).toISOString();

const IdType = new GraphQLEnumType({
  name: "Id",
  values: {
    PRODUCT_UNIT_ID: { value: 0 },
    IMEI: { value: 1 },
    SERIAL: { value: 2 },
  },
});

const HeaderType = new GraphQLObjectType({
  name: "Header",
  description: "Header of an object consistent with CIO.",
  fields: () => ({
    id: { type: GraphQLString },
    itemType: { type: GraphQLString },
    createdTimeUtc: { type: GraphQLString },
    modifiedTimeUtc: { type: GraphQLString },
  }),
});

const ProductUnitDataType = new GraphQLObjectType({
  name: "ProductUnitData",
  description: "This represents the data of one product unit.",
  fields: () => ({
    productId: { type: GraphQLString },
    imei: { type: GraphQLString },
    serialNumber: { type: GraphQLString },
    firmware: { type: GraphQLString },
    revision: { type: GraphQLString },
    lotNumber: { type: GraphQLString },
  }),
});

const ProductUnitType = new GraphQLObjectType({
  name: "ProductUnit",
  description: "This represents one product unit.",
  fields: () => ({
    header: { type: GraphQLNonNull(HeaderType) },
    data: { type: GraphQLNonNull(ProductUnitDataType) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "Query",
  description: "Root Query",
  fields: () => ({
    productUnit: {
      type: ProductUnitType,
      description: "An individual instance of a product.",
      args: {
        productUnitId: { type: GraphQLString },
        imei: { type: GraphQLString },
        serialNumber: { type: GraphQLString },
      },
      resolve: (parent, { productUnitId, imei, serialNumber }) => {
        return getProductUnit(productUnitId, imei, serialNumber);
      },
    },
  }),
});

module.exports = { RootQueryType };
