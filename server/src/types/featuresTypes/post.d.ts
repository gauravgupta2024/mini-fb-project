export interface PostDataUploadObjType {
  public_id: string;
  url: string;
}
export interface PostDataObjType {
  textCaption: string;
  contentType: string;
  postDataUploads?: PostDataUploadObjType[];
}
