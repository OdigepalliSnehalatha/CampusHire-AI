package com.campushire.service;

import com.campushire.dto.*;
import com.campushire.entity.Role;
import com.campushire.entity.StudentProfile;
import com.campushire.entity.User;
import com.campushire.exception.BadRequestException;
import com.campushire.repository.StudentProfileRepository;
import com.campushire.repository.UserRepository;
import com.campushire.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final StudentProfileRepository studentProfileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;

    public AuthService(UserRepository userRepository,
                       StudentProfileRepository studentProfileRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider) {
        this.userRepository = userRepository;
        this.studentProfileRepository = studentProfileRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        String token = tokenProvider.generateToken(authentication);
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadRequestException("User not found"));

        UserDto userDto = convertToDto(user);
        return new AuthResponse(token, userDto);
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email already registered: " + request.getEmail());
        }

        User user = new User(
                request.getEmail(),
                passwordEncoder.encode(request.getPassword()),
                request.getFullName(),
                request.getRole()
        );
        user = userRepository.save(user);

        if (user.getRole() == Role.STUDENT) {
            StudentProfile profile = new StudentProfile(
                    user,
                    request.getDepartment() != null ? request.getDepartment() : "Computer Science and Engineering",
                    request.getCgpa() != null ? request.getCgpa() : 8.0,
                    request.getGraduationYear() != null ? request.getGraduationYear() : 2026,
                    request.getTargetRole() != null ? request.getTargetRole() : "Java Backend Developer"
            );
            studentProfileRepository.save(profile);
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );
        String token = tokenProvider.generateToken(authentication);

        return new AuthResponse(token, convertToDto(user));
    }

    public UserDto getCurrentUserDto(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new BadRequestException("User not found"));
        return convertToDto(user);
    }

    private UserDto convertToDto(User user) {
        UserDto dto = new UserDto(user.getId(), user.getEmail(), user.getFullName(), user.getRole());
        if (user.getRole() == Role.STUDENT) {
            studentProfileRepository.findByUser(user).ifPresent(profile -> {
                dto.setStudentProfileId(profile.getId());
                dto.setDepartment(profile.getDepartment());
                dto.setCgpa(profile.getCgpa());
                dto.setTargetRole(profile.getTargetRole());
                dto.setProfileCompletion(profile.getProfileCompletion());
            });
        }
        return dto;
    }
}
