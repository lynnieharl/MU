const fs = require('fs');

let html = fs.readFileSync('manage-products.html', 'utf8');

const fallbackDataJS = `
        const FALLBACK_PRODUCTS = [
            { id: 1, name: 'Manchester United Home Shirt 2024-25', price: 2500000, category: 'Jerseys', subcategory: 'Home', image_url: 'https://i.pinimg.com/736x/89/3e/32/893e32ca12e3f5d5b77ff0a59b6c00d8.jpg', description: 'Official Home Kit 24/25' },
            { id: 2, name: 'Manchester United Away Shirt 2024-25', price: 2500000, category: 'Jerseys', subcategory: 'Away', image_url: 'https://i.pinimg.com/736x/67/da/75/67da75762c647b5ad3246ebc6046eef2.jpg', description: 'Official Away Kit 24/25' },
            { id: 3, name: 'Manchester United Third Shirt 2024-25', price: 2600000, category: 'Jerseys', subcategory: 'Third', image_url: 'https://i.pinimg.com/736x/91/97/bd/9197bd410cdae340ef87a41fc04f4693.jpg', description: 'Official Third Kit 24/25' },
            { id: 4, name: 'Manchester United Training Top 2024', price: 1500000, category: 'Training', subcategory: 'Tops', image_url: 'https://i.pinimg.com/736x/e4/f0/a4/e4f0a4dbdcf7d6112d31da7e31d3f9ec.jpg', description: 'Training Gear' },
            { id: 5, name: 'Manchester United Scarf', price: 450000, category: 'Accessories', subcategory: 'Scarves', image_url: 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac', description: 'Red & White Scarf' }
        ];

        function updateKPIs(products) {
            const total = products.length;
            const jerseys = products.filter(p => p.category === 'Jerseys').length;
            const training = products.filter(p => p.category === 'Training').length;
            const other = total - jerseys - training;
            
            const elTotal = document.getElementById('stat-total');
            const elJerseys = document.getElementById('stat-jerseys');
            const elTraining = document.getElementById('stat-training');
            const elOther = document.getElementById('stat-other');
            
            if(elTotal) elTotal.textContent = total;
            if(elJerseys) elJerseys.textContent = jerseys;
            if(elTraining) elTraining.textContent = training;
            if(elOther) elOther.textContent = other;
        }

        async function loadProducts() {
            try {
                const { data: products, error } = await supabaseClient
                    .from('products')
                    .select('*')
                    .order('id', { ascending: false });

                const tbody = document.getElementById('prd-table-body');
                if (!tbody) return;

                if (error) {
                    if (error.code === 'PGRST205') {
                        // Fallback to mock data if table doesn't exist
                        allProductsData = FALLBACK_PRODUCTS;
                        updateKPIs(allProductsData);
                        renderProductsTable(allProductsData);
                        return;
                    }
                    throw error;
                }

                allProductsData = products || [];
                if (allProductsData.length === 0) {
                    // Fallback to mock data if empty
                    allProductsData = FALLBACK_PRODUCTS;
                }
                
                updateKPIs(allProductsData);
                renderProductsTable(allProductsData);

            } catch (ex) {
                console.error('Lỗi truy vấn sản phẩm:', ex);
                allProductsData = FALLBACK_PRODUCTS;
                updateKPIs(allProductsData);
                renderProductsTable(allProductsData);
            }
        }`;

// 1. Replace loadProducts
const loadProductsRegex = /async function loadProducts\(\) \{[\s\S]*?catch \(ex\) \{[\s\S]*?\}\s*\}/;
html = html.replace(loadProductsRegex, fallbackDataJS);

// 2. Fix the ID in renderProductsTable
html = html.replace(`const tbody = document.getElementById('products-table-body');`, `const tbody = document.getElementById('prd-table-body');`);

// 3. Update the empty message inside renderProductsTable to use prd-table-body
// Actually it uses tbody.innerHTML, so fixing tbody variable is enough.

fs.writeFileSync('manage-products.html', html);
console.log('manage-products.html updated with fallback data and KPI calculation');
