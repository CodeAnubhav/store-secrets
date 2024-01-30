import config from "../config/config";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl) // Your API Endpoint
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost({ title, slug, content, status, userId }) {
    try {
      return await this.databases.createDocument(
        config.appwriteDBId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          slug,
          content,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("appwrite createpost", error);
    }
  }
  async updatePost(slug, { title, slug, content, status }) {
    try {
      return await this.databases.updateDocument(
        config.appwriteDBId,
        config.appwriteCollectionId,
        slug,
        {
          title,
          content,
          status,
        }
      );
    } catch (error) {
      console.log("Update post", error);
    }
  }
  async deletePost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwriteDBId,
        config.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("deletepost", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwriteDBId,
        config.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.log("getPost error", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status" , "active")]){
    try {
        return await this.databases.getDocument(
            config.appwriteDBId,
            config.appwriteCollectionId,
            queries,
          );
    } catch (error) {
        console.log("GetPosts error" , error)
    }
  }
}

const service = new Service();

export default service;
