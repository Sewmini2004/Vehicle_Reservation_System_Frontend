export function InputField(id, type, placeholder, labelText, icon) {
    return `
        <div class="mb-3 position-relative">
            <label for="${id}" class="form-label text-dark">${labelText}</label>
            <div class="input-group">
                <span class="input-group-text"><i class="${icon}"></i></span>
                <input type="${type}" class="form-control" id="${id}" placeholder="${placeholder}" required>
            </div>
        </div>
    `;
}
