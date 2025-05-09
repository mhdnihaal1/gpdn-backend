import { Request, Response, NextFunction } from "express";
import UserUsecase from "../../UsecaseLayer/UserUsecase/UserUsecase";
import { Client, Storage, ID } from "node-appwrite";
 
import fs from 'fs';
import  storage  from "../../InfrastructureLayer/services/AppwriteImage";  


class UserController {
  private UserUsecase: UserUsecase;

  constructor(UserUsecase: UserUsecase) {
    this.UserUsecase = UserUsecase;
  }

  

  async Register(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        fullName,
        email,
        phoneNumber,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        role,
        password,
      } = req.body;


      const registrationForm = await this.UserUsecase.registrationForm(
        fullName,
        email,
        phoneNumber,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        role,
        password
       );
      
      return res.json({
        success: registrationForm?.success,
        status: registrationForm?.status,
        data: registrationForm?.data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  
  // async Login(req: Request, res: Response, next: NextFunction) {
  // try {

  //     const { phoneNumber } = req.body;

  //     const otpSession  = await this.UserUsecase.loginForm( phoneNumber)
  //     console.log('oncontroller',otpSession)
  //   //   const userid = otpSession?.data?.message?.userId;

      
  //   //   console.log(userId)
  //   //   return null
  //   //   if (otpSession?.userId) {
  //   //     // req.session.otpUserId = otpSession.userId;
  //   // } else {
  //   //     return {
  //   //         success: false,
  //   //         status: 500,
  //   //         data: {
  //   //             message: "Failed to generate OTP.",
  //   //         },
  //   //     };
  //   // }

  //     return res.json({
  //       status: otpSession?.status,
  //       data: otpSession?.data,
  //     });

  // }catch(error){
  //   console.log(error)
  // }
  // }


  // async Verify(req: Request, res: Response, next: NextFunction) {
  //   try {
  
  //       const { userId , verificationCode } = req.body;
  
  //       const otpSession = await this.UserUsecase.verifyForm(  userId , verificationCode )
  //         if (otpSession?.userId) {
  //                     // req.session.otp = otpSession.userId;
  //                 } else {
  //                     return {
  //                         success: false,
  //                         status: 500,
  //                         data: {
  //                             message: "Failed to generate OTP.",
  //                         },
  //                     };
  //                 }
  
  //       // return res.json({
  //       //   status: otpSession?.status,
  //       //   data: otpSession?.data,
  //       // });
  
  //   }catch(error){
  //     console.log(error)
  //   }
  //   }


  async EditUser(req: Request, res: Response, next: NextFunction){
    try{
      console.log("okkkkk")
      const {
        _id,
        fullName,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        email,
        password,
        phoneNumber,
      } = req.body;
  
      if (
        !_id ||
        !fullName ||
        !photo ||
        !bio ||
        !countryOfPractice ||
        !medicalQualification ||
        !yearOfGraduation ||
        !hasFormalTrainingInPalliativeCare ||
        !medicalRegistrationAuthority ||
        !medicalRegistrationNumber ||
        !affiliatedPalliativeAssociations ||
        !specialInterestsInPalliativeCare ||
        !password ||
        !email ||
        !phoneNumber 
      ) {
        
        return res.json({
          success: false,
          status:400,
          data:{
              message:"Missing required fields."
          } 
        });
      }
  
      const updateUserForm = await this.UserUsecase.editUserForm(
        _id,
        fullName,
        email,
        phoneNumber,
        photo,
        bio,
        countryOfPractice,
        medicalQualification,
        yearOfGraduation,
        hasFormalTrainingInPalliativeCare,
        medicalRegistrationAuthority,
        medicalRegistrationNumber,
        affiliatedPalliativeAssociations,
        specialInterestsInPalliativeCare,
        password,
      );
      
      return res.json({
        success: updateUserForm?.success,
        status: updateUserForm?.status,
        data: updateUserForm?.data,
      }); 
  
      
    }catch(error){
      console.log(error)
    }
  }

    async ResetORForgotPassword(req:Request , res:Response , next: NextFunction){
      try{

        
        const { _id ,password} = req.body;
  
         const resetORforgotPassword = await this.UserUsecase.resetORforgotPasswordForm(  _id , password )     

        return res.json({
          success: resetORforgotPassword?.success,
          status: resetORforgotPassword?.status,
          data: resetORforgotPassword?.data,
        });
        
      }catch(error){
        console.log(error)
      }
    }
    

    async VerifyOtp(req:Request , res:Response , next: NextFunction){
      try{
        const { email , otp } = req.body;
  
        const verifyOtp = await this.UserUsecase.VerifyOtpForm(  otp ,email )

        return res.json({
          success: verifyOtp?.success,
          status: verifyOtp?.status,
          data: verifyOtp?.data,
        });

        
      }catch(error){
        console.log(error)
      }
    }
    
   

  

    
    async ContactEmail(req:Request , res:Response , next: NextFunction){
      try{
console.log('you are right')
        const { name, email, phone, message } = req.body;
      
  
        const ContactEmail = await this.UserUsecase.ContactEmailForm(  name , email , phone , message )
    
        return res.json({
          success: ContactEmail?.success,
          status: ContactEmail?.status,
          data: ContactEmail?.data,
        });

        
      }catch(error){
        console.log(error)
      }
    }
}

export default UserController;
