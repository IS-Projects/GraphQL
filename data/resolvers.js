import { reject } from 'lodash';
import { Widgets } from './dbConnectors';

const resolvers = {
  getProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.findById(id, (err, product) => {
        if (err) {
          reject(err);
        } else {
          resolve(product);
        }
      });
    });
  },
  getAllProducts: () => Widgets.find({}),
  createProduct: ({ input }) => {
    // let id = require('crypto').randomBytes(10).toString('hex');
    // productDatabase[id] = input;
    // return new Product(id, input);
    const newWidget = new Widgets({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores,
    });

    newWidget.id = newWidget._id;
    return new Promise((resolve) => {
      newWidget.save((err) => {
        if (err) {
          reject(err);
        } else {
          resolve(newWidget);
        }
      });
    });
  },
  updateProduct: ({ input }) => {
    return new Promise((resolve) => {
      Widgets.findByIdAndUpdate(
        { _id: input.id },
        input,
        { new: true },
        (err, widget) => {
          if (err) {
            reject(err);
          } else {
            resolve(widget);
          }
        }
      );
    });
  },
  deleteProduct: ({ id }) => {
    return new Promise((resolve) => {
      Widgets.remove({ _id: id }, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve('Successfully deleted widget');
        }
      });
    });
  },
};

export default resolvers;
