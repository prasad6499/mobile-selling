package com.cdac.mobileselling.util;

import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.cdac.mobileselling.model.User;

import javax.mail.MessagingException;


import java.io.File;
import java.util.Objects;


@Service
public class MailSenderService {

    private final JavaMailSender javaMailSender;

    public MailSenderService(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public void send(User user, String attachment) throws MessagingException {


        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(javaMailSender.createMimeMessage(), true);
        mimeMessageHelper.setFrom("jaccobrths@gmail.com");
        mimeMessageHelper.setTo(user.getEmail());
        mimeMessageHelper.setSubject("Order Details");
        mimeMessageHelper.setText("Kindly scan the below QR code to get the order details", true);
        FileSystemResource fileSystem
                = new FileSystemResource(new File(attachment));

        mimeMessageHelper.addAttachment(Objects.requireNonNull(fileSystem.getFilename()),
                fileSystem);
        javaMailSender.send(mimeMessageHelper.getMimeMessage());

    }

    private String generateMailBody(String verificationUrl, User  user){
        return "<h4>Hi " +user.getUserName()+", </h4><br>"+
                "<h5>Please click on below button to verify the user account</h5>"+
                "<a href="+verificationUrl+"><button style='color: 'blue''>Verify Account</button></a><br>"+
                "<h5>Warm Regards</h5>"+
                "<h5>Rateberg</h5>";
    }
}
