package com.gigagit.user.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gigagit.user.model.User;
import com.gigagit.user.service.UserService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost")
public class WebController {

	private final UserService userService;

	public WebController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("/users")
	public ResponseEntity<?> getAllUsers() {
		return ResponseEntity.ok(userService.findAll());
	}

	@PostMapping("/users")
	public ResponseEntity<?> postNewUser(@Validated @RequestBody User user) {
		Optional<User> userOptional = userService.findByUsername(user.getUsername());

		if (userOptional.isPresent()) {
			return ResponseEntity.status(HttpStatus.CONFLICT).build();
		}

		userService.save(user);
		URI location = null;

		try {
			location = new URI("/users/" + user.getUsername());
		} catch (URISyntaxException e) {
			e.printStackTrace();
		}

		return ResponseEntity.created(location).build();
	}

	@GetMapping("/users/{id}")
	public ResponseEntity<?> getUserId(@PathVariable long id) {
		Optional<User> userOptional = userService.findById(id);

		if (!userOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(userOptional.get());
	}

	@DeleteMapping("/users/{id}")
	public ResponseEntity<?> deleteUserId(@PathVariable long id) {
		Optional<User> userOptional = userService.findById(id);

		if (!userOptional.isPresent()) {
			return ResponseEntity.notFound().build();
		}
		
		userService.deleteById(id);
		return ResponseEntity.noContent().build();
	}

	@PutMapping("/users/{id}")
	public ResponseEntity<?> putUserId(@PathVariable long id, @Validated @RequestBody User user) {
		Optional<User> userOptional = userService.findByUsername(user.getUsername());

		if (userOptional.isPresent()) {
			if (id != userOptional.get().getId()) {
				return ResponseEntity.status(HttpStatus.CONFLICT).build();
			}
		}

		user.setId(id);
		userService.save(user);
		return ResponseEntity.noContent().build();
	}

}
