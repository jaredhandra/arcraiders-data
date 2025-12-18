export type LocalizedText = Record<string, string>;

export type ResourceMap = Record<string, number>;

export type EffectValue = string | number | boolean | string[] | null | undefined;

export interface Item {
  id?: string;
  name: LocalizedText;
  description?: LocalizedText;
  type?: string;
  value?: number;
  rarity?: string;
  recyclesInto?: ResourceMap;
  weightKg?: number;
  stackSize?: number;
  effects?: Record<string, any>;
  imageFilename?: string;
  updatedAt?: string;
  recipe?: ResourceMap;
  craftBench?: string | string[];
  salvagesInto?: ResourceMap;
  isWeapon?: boolean;
  [key: string]: any;
}

export default Item;
