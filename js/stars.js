// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';

document.addEventListener("DOMContentLoaded", () => {
    setupCustomCursor();
    loadPDFPages();
});

async function loadPDFPages() {
    const container = document.getElementById("pdf-container");
    
    try {
        // Load both PDFs
        const pdfFiles = [
            "../assets/works/stars/stars-1.pdf",
            "../assets/works/stars/stars-2.pdf"
        ];
        
        // First pass: load all PDFs and collect pages info
        const allPages = [];
        
        for (const pdfPath of pdfFiles) {
            try {
                const pdf = await pdfjsLib.getDocument(pdfPath).promise;
                
                for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
                    allPages.push({ pdf, pageNum, pdfPath });
                }
            } catch (error) {
                console.error(`Error loading PDF ${pdfPath}:`, error);
            }
        }
        
        // Create all wrappers upfront (prevents page from expanding as pages load)
        const wrappers = allPages.map(() => {
            const wrapper = document.createElement("div");
            wrapper.className = "pdf-page-wrapper";
            container.appendChild(wrapper);
            return wrapper;
        });
        
        // Now render all pages (can render in parallel)
        allPages.forEach((pageInfo, index) => {
            renderPageAsync(pageInfo.pdf, pageInfo.pageNum, wrappers[index]);
        });

    } catch (error) {
        console.error("Error loading PDFs:", error);
        
        const placeholder = document.createElement("div");
        placeholder.className = "pdf-placeholder";
        placeholder.innerHTML = `
            <p>PDF files not found</p>
            <span class="pdf-page-number">Please upload PDF files to: assets/works/stars/</span>
            <span class="pdf-page-number">Expected files: stars-1.pdf and stars-2.pdf</span>
        `;
        container.appendChild(placeholder);
    }
}

async function renderPageAsync(pdf, pageNum, wrapper) {
    try {
        const page = await pdf.getPage(pageNum);
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        canvas.className = "pdf-page";
        wrapper.appendChild(canvas);
    } catch (error) {
        console.error(`Error rendering page:`, error);
    }
}

function setupCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement("div");
    cursor.className = "custom-cursor";
    document.body.appendChild(cursor);

    function getBackgroundColor(el) {
        let current = el;
        while (current && current !== document.body) {
            const bg = window.getComputedStyle(current).backgroundColor;
            if (bg && bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent") {
                return bg;
            }
            current = current.parentElement;
        }
        return window.getComputedStyle(document.body).backgroundColor;
    }

    function rgbToHex(rgb) {
        const match = rgb.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/);
        if (!match) return null;
        const hex = "#" + [parseInt(match[1]), parseInt(match[2]), parseInt(match[3])]
            .map(x => x.toString(16).padStart(2, '0'))
            .join('')
            .toLowerCase();
        return hex;
    }

    document.addEventListener("mousemove", (e) => {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";

        const element = document.elementFromPoint(e.clientX, e.clientY);
        if (element) {
            const bgColor = getBackgroundColor(element);
            const hexColor = rgbToHex(bgColor);
            
            cursor.classList.remove("on-blue-bg");
            
            if (hexColor) {
                if (hexColor === "#84abcc" || hexColor === "#d4e8f7") {
                    cursor.classList.add("on-blue-bg");
                }
            }
        }
    });

    const interactiveElements = document.querySelectorAll("a, button, .illustration-item, .works-ref-item, .toggle-tab");
    interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => cursor.classList.add("cursor-hover"));
        el.addEventListener("mouseleave", () => cursor.classList.remove("cursor-hover"));
    });
}
