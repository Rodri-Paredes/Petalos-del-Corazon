-- 🔒 Solo usuarios autenticados pueden subir imágenes al bucket product-images
CREATE POLICY "Authenticated users can upload product-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- 🔒 Solo usuarios autenticados pueden eliminar sus propias imágenes (opcional)
CREATE POLICY "Authenticated users can delete their product-images"
ON storage.objects
FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND owner = auth.uid());

-- 👀 Todos pueden leer imágenes del bucket (para que los clientes vean los productos)
CREATE POLICY "Anyone can read product-images"
ON storage.objects
FOR SELECT
USING (bucket_id = 'product-images');
