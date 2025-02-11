import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from '../env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Use false for authenticated requests
  token: process.env.SANITY_API_TOKEN, // Ensure token is being used
});