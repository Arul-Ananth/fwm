/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package vit.api.services;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import vit.api.services.model.FileResponse;

@RestController
@RequestMapping("/api")
public class FileController {

    private final FileStorageService fileStorageService;

    public FileController(FileStorageService fileStorageService) {
        this.fileStorageService = fileStorageService;
    }

    // Upload multiple files
    @PostMapping("/upload")
    public ResponseEntity<List<FileResponse>> uploadFiles(@RequestParam("files") MultipartFile[] files) {
        List<FileResponse> responses = List.of(files).stream().map(file -> {
            try {
                String fileName = fileStorageService.saveFile(file);
                return new FileResponse(fileName, fileName, "File uploaded successfully", fileName);
            } catch (IOException e) {
                return new FileResponse(file.toString(), file.toString(),"File upload failed", "");
            }
        }).collect(Collectors.toList());

        return ResponseEntity.ok(responses);
    }

    // List all uploaded files
    @GetMapping("/doclist")
    public ResponseEntity<List<FileResponse>> listFiles() {
        return ResponseEntity.ok(fileStorageService.listFiles());
    }

    // Delete a file by ID
    @DeleteMapping("/doclist/{fileName}")
    public ResponseEntity<FileResponse> deleteFile(@PathVariable String fileName) {
        boolean isDeleted = fileStorageService.deleteFile(fileName);
        if (isDeleted) {
            return ResponseEntity.ok(new FileResponse(fileName, fileName, "File deleted successfully", fileName));
        } else {
            return ResponseEntity.status(404).body(new FileResponse( fileName, fileName,"File not found", ""));
        }
    }
}

