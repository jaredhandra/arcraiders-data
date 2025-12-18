export type LocalizedText = { [lang: string]: string };

export type ResourceMap = { [resource: string]: number };

export interface EffectEntry extends LocalizedText {
  value: string;
}

export type EffectsMap = { [effectName: string]: EffectEntry };

export interface Item {
  id: string;
  name: LocalizedText;
  description?: LocalizedText;
  type?: string;
  value?: number;
  rarity?: string;
  recyclesInto?: ResourceMap;
  weightKg?: number;
  stackSize?: number;
  effects?: EffectsMap;
  imageFilename?: string;
  updatedAt?: string;
  recipe?: ResourceMap;
  craftBench?: string;
  salvagesInto?: ResourceMap;
}

export default Item;
