package com.skillhub;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;

@RestController
public class CourseController {
  @GetMapping("/health")
  public String health() { return "{\"status\":\"courses ok\"}"; }
  @GetMapping("/courses")
  public List<String> list() { return List.of("Intro to Java","AI Basics","Rust Fundamentals"); }
}
