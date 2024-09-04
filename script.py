import os

def is_code_file(file_name):
    code_extensions = [".jsx"]
    _, extension = os.path.splitext(file_name)
    return extension.lower() in code_extensions

def write_files_contents(directory, output_file):
    with open(output_file, 'w', encoding='utf-8') as output:
        for root, dirs, files in os.walk(directory):
            # Exclude the node_modules directory
            if 'node_modules' in dirs:
                dirs.remove('node_modules')
            for file in files:
                file_path = os.path.join(root, file)
                if is_code_file(file):
                    with open(file_path, 'rb') as f:
                        content = f.read().decode('utf-8', 'ignore')
                        output.write(f"# {file_path}\n")
                        output.write(content)
                        output.write('\n\n')

# Specify the directory you want to include
directory = os.getcwd()
# Specify the output file
output_file = "output.txt"

write_files_contents(directory, output_file)
