document.addEventListener('DOMContentLoaded', () => {
    setTimeout(initMegaMenus, 500);
});

async function initMegaMenus() {
    if (!window.supabaseClient) {
        console.warn('Supabase client not found. Mega menus will not show products.');
        return;
    }

    const megaMenuMappings = [
        { containerId: 'mega-products-training', category: 'Training' },
        { containerId: 'mega-products-fashion', category: 'Accessories' }, // Using Accessories for Fashion as fallback
        { containerId: 'mega-products-accessories', category: 'Accessories' }
    ];

    for (const mapping of megaMenuMappings) {
        const container = document.getElementById(mapping.containerId);
        if (!container) continue;

        try {
            let query = window.supabaseClient
                .from('products')
                .select('id, name, price, image_url')
                .eq('category', mapping.category)
                .order('id', { ascending: false })
                .limit(3);
                
            const { data: products, error } = await query;
            
            if (error) throw error;
            
            if (products && products.length > 0) {
                renderMegaProducts(container, products);
            } else {
                const { data: fallback } = await window.supabaseClient
                    .from('products')
                    .select('id, name, price, image_url')
                    .order('id', { ascending: false })
                    .limit(3);
                if (fallback) renderMegaProducts(container, fallback);
            }
        } catch (err) {
            console.error(`Failed to fetch products for ${mapping.category}:`, err);
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
