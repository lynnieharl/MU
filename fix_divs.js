const fs = require('fs');

let crmHtml = fs.readFileSync('admin-crm.html', 'utf8');

// Find the block around header-profile-section to fix the div closing tags
const brokenBlock = `                                    </a>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-content">`;

const fixedBlock = `                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-content">`;

crmHtml = crmHtml.replace(brokenBlock, fixedBlock);

fs.writeFileSync('admin-crm.html', crmHtml);
console.log('Fixed admin-crm layout divs.');
