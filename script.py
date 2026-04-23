from psd_tools import PSDImage
import os
import re

# Load PSB file
psd = PSDImage.open(r"C:\Users\palya\Downloads\Untitled design (18).psd")

# Output folder
output_folder = 'output_layers'
os.makedirs(output_folder, exist_ok=True)

# Clean filename function
def clean_filename(name):
    name = re.sub(r'[\\/*?:"<>|]', "", name)  # remove invalid chars
    name = name.replace(" ", "_")             # replace spaces
    return name.strip("_") or "layer"         # fallback if empty

counter = {}

def get_unique_filename(base_name):
    if base_name not in counter:
        counter[base_name] = 1
        return base_name
    else:
        counter[base_name] += 1
        return f"{base_name}_{counter[base_name]}"

def export_layers(layers, parent_name=""):
    for layer in layers:
        if not layer.is_visible():
            continue

        safe_layer_name = clean_filename(layer.name)
        safe_parent = clean_filename(parent_name)
        layer_name = f"{safe_parent}_{safe_layer_name}".strip("_")

        try:
            if layer.is_group():
                export_layers(layer, layer_name)
            else:
                image = layer.composite()
                if image:
                    base_name = layer_name[:150]
                    unique_name = get_unique_filename(base_name)

                    file_path = os.path.join(output_folder, f"{unique_name}.png")
                    image.save(file_path)

                    print(f"Saved: {file_path}")

        except Exception as e:
            print(f"Skipped: {layer.name} | Error: {e}")
# Run extraction
export_layers(psd)