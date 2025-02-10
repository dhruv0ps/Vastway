export interface ImageFile {
  file?: File;
  url: string;
  id?: string;
  size?: number;
  dimensions?: string;
  title?: string;     
  caption?: string;   
  altText?: string;    
}

  export interface ImageDetails {
    title?: string;
    caption?: string;
    altText?: string;
    url?: string;
  }