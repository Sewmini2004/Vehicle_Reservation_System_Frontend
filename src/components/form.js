export default function InputField(id, type, placeholder, labelText) {
    return `
        <div class="mb-3">
            <label for="${id}" class="form-label">${labelText}</label>
            <input type="${type}" class="form-control" id="${id}" placeholder="${placeholder}" required>
        </div>
    `;
}
