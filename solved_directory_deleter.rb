require 'zip'

# ---- RUN THIS INSIDE OF A 01-Activities DIRECTORY ----


def processDirectory(path)
    files = Dir.glob("#{path}/*")
    files.each do |filePath|
        isDirectory = File.directory?(filePath)
        if isDirectory
            fileName = File.basename(filePath)
            if fileName == "Solved"
				FileUtils.remove_dir(filePath)
            else
                processDirectory(filePath)
            end
		# this is here because I ran the other script and then went, "oh no I can't upload zip files to GitLab"
		#elsif File.extname(filePath) == '.zip'
		#	FileUtils.rm(filePath)
        #end
    end
end

processDirectory('.')
