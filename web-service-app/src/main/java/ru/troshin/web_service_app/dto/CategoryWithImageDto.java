package ru.troshin.web_service_app.dto;

import lombok.Data;
import ru.troshin.web_service_app.models.Category;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Base64;
@Data
public class CategoryWithImageDto {

    private Category category;
    private byte[] image;

    public CategoryWithImageDto(Category category, byte[] image) throws IOException {
        this.category = category;
        this.image=image;
    }
}
