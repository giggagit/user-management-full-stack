package com.gigagit.user.service;

import java.util.List;
import java.util.Optional;

import com.gigagit.user.model.User;

public interface UserService {

	public void save(User user);

	public Optional<User> findById(long id);

	public Optional<User> findByUsername(String username);

	public List<User> findAll();

	public void deleteById(long id);

}
