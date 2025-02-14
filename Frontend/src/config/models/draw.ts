import { Category } from "./category";

export interface NocCode {
  _id: string;
  tier: string;
  nocCode: string;
  classTitle: string;
}

  
  export interface subCategory {
    id: string;
    name: string;
  }
  
  export interface Draw {
    title: string;
    category: Category;
    subCategories: Array<subCategory | string>;
    publishedBy: string;
    invitationsIssued: string;
    drawDate: string;
    crsCutoff: string;
    score: string;
    rankRequired: string;
    tieBreakingRule: string;
    additionalInfo: string;
    image: File | null;
    imageCaption: string;
    nocCodes: NocCode[];
    metaTitle: string;
    metaDescription: string;
    linkEdit: string;
    imageUrl?: File | null;
    _id:string
  }
  export interface DrawList {
    _id: string;
    title: string;
    image: string;
    imageUrl: string;
    category: { name: string };
    drawDate: string;
    candidates: number;
    linkEdit : string;
  }