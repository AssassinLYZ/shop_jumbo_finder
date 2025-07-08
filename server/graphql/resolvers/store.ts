import fs from 'fs';
import path from 'path';
import type { Facilities, Store } from '../../../types/store';

const getStoresData = (): Store[] => {
  const filePath = path.resolve(process.cwd(), 'server/data/jumbo-store-data.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  const parsedData = JSON.parse(data);
  return parsedData.stores;
};

export const storeResolvers = {
  Query: {
    stores: () => {
      return getStoresData();
    },

    store: ({ storeId }: { storeId: string }) => {
      const stores = getStoresData();
      return stores.find((store: Store) => store.storeId === storeId);
    },

    storesByCity: (_: unknown, { city }: { city: string }) => {
      console.log(_);
      const stores = getStoresData();
      return stores.filter((store: Store) =>
        store.location.address.city.toLowerCase().includes(city.toLowerCase()),
      );
    },

    storesWithFacility: (_: unknown, { facility }: { facility: string }) => {
      const stores = getStoresData();
      return stores.filter((store: Store) => {
        const facilities = store.facilities as Facilities;
        return facilities[facility as keyof Facilities] === true;
      });
    },
  },
};
