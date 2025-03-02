-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- Create a secure function to check if the request is from an admin
CREATE OR REPLACE FUNCTION is_admin_request()
RETURNS BOOLEAN AS $$
BEGIN
  -- Check if the request header contains the admin API key
  -- This works with Supabase Edge Functions and server-side API calls
  RETURN current_setting('request.headers', true)::json->>'x-admin-key' = 
         current_setting('app.admin_api_key', true);
EXCEPTION
  WHEN OTHERS THEN
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Products Table Policies

-- Anyone can read products
CREATE POLICY "Anyone can read products"
ON products
FOR SELECT
USING (true);

-- Only admins can insert products
CREATE POLICY "Only admins can insert products"
ON products
FOR INSERT
WITH CHECK (is_admin_request());

-- Only admins can update products
CREATE POLICY "Only admins can update products"
ON products
FOR UPDATE
USING (is_admin_request())
WITH CHECK (is_admin_request());

-- Only admins can delete products
CREATE POLICY "Only admins can delete products"
ON products
FOR DELETE
USING (is_admin_request());

-- Orders Table Policies

-- Only admins can read all orders
CREATE POLICY "Only admins can read all orders"
ON orders
FOR SELECT
USING (is_admin_request());

-- Anyone can insert orders (for checkout)
CREATE POLICY "Anyone can insert orders"
ON orders
FOR INSERT
WITH CHECK (true);

-- Only admins can update orders
CREATE POLICY "Only admins can update orders"
ON orders
FOR UPDATE
USING (is_admin_request())
WITH CHECK (is_admin_request());

-- Only admins can delete orders
CREATE POLICY "Only admins can delete orders"
ON orders
FOR DELETE
USING (is_admin_request());

-- Storage Policies

-- Anyone can read product images
CREATE POLICY "Anyone can read product images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');

-- Only admins can upload product images
CREATE POLICY "Only admins can upload product images"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' AND
  is_admin_request()
);

-- Only admins can update product images
CREATE POLICY "Only admins can update product images"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'product-images' AND
  is_admin_request()
)
WITH CHECK (
  bucket_id = 'product-images' AND
  is_admin_request()
);

-- Only admins can delete product images
CREATE POLICY "Only admins can delete product images"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'product-images' AND
  is_admin_request()
);

