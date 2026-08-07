document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMegaMenus, 500);
});

async function initMegaMenus() {
    if (!window.supabaseClient) {
        console.warn('Supabase client not found. Mega menus will not show products.');
        return;
    }

    const megaMenuMappings = [
        { containerId: 'mega-products-jerseys', categoryMatch: ['Home', 'Away', 'Third', 'Goalkeeper'] },
        { containerId: 'mega-products-training', categoryMatch: ['Training'] },
        { containerId: 'mega-products-fashion', categoryMatch: ['Fashion'] },
        { containerId: 'mega-products-accessories', categoryMatch: ['Accessories'] }
    ];

    for (const mapping of megaMenuMappings) {
        const container = document.getElementById(mapping.containerId);
        if (!container) continue;

        try {
            let query = window.supabaseClient
                .from('products')
                .select('id, name, price, image_url')
                .in('category', mapping.categoryMatch)
                .order('id', { ascending: false })
                .limit(3);
                
            const { data: products, error } = await query;
            
            if (error) throw error;
            
            if (products && products.length > 0) {
                renderMegaProducts(container, products);
            } else {
                // No products found for this specific category
                container.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:#888; font-family:Arial,sans-serif; text-align:center;">
                        <i class="fa-solid fa-box-open" style="font-size:24px; margin-bottom:10px; color:#ccc;"></i>
                        <span style="font-size:14px;">More coming soon</span>
                    </div>
                `;
            }
        } catch (err) {
            console.error(`Failed to fetch products for ${mapping.categoryMatch.join(',')}:`, err);
        }
    }
}

function renderMegaProducts(container, products) {
    const html = products.map(p => {
        const imgUrl = p.image_url || 'https://images.unsplash.com/photo-1577003833758-c0b93e8784ac?auto=format&fit=crop&w=400&q=80';
        const priceFormatted = '₫' + new Intl.NumberFormat('en-US').format(p.price || 0);
        
        return `
            <a href="product.html?id=${p.id}" class="mega-product-card">
                <img src="${imgUrl}" alt="${p.name}">
                <h4>${p.name}</h4>
                <p>${priceFormatted}</p>
            </a>
        `;
    }).join('');
    
    container.innerHTML = html;
}
