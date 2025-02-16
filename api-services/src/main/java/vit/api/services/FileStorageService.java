/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package vit.api.services;


import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.*;
import java.util.*;
import java.util.stream.Collectors;
import vit.api.services.model.FileResponse;

@Service
public class FileStorageService {
    
    private static final String UPLOAD_DIR = "uploads/";

    public FileStorageService() {
        // Ensure the upload directory exists
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdir();
        }
    }

    public String saveFile(MultipartFile file) throws IOException {
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(UPLOAD_DIR + fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    public List<FileResponse> listFiles() {
        File directory = new File(UPLOAD_DIR);
        List<FileResponse> list = new ArrayList<>();
        
        for (File file : directory.listFiles()){
            FileResponse res = new FileResponse(file.getName(), file.getName(), "", UPLOAD_DIR);
            list.add(res);
        }
        
        return list;

    }

    public boolean deleteFile(String fileName) {
        
        File file = new File(UPLOAD_DIR + fileName);
        return file.exists() && file.delete();
    }
}
