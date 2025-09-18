from pydantic import BaseModel,EmailStr,Field, model_validator
from typing import Annotated,Optional

class LoginUser(BaseModel):
    email: Annotated[EmailStr,Field(...,description="user email")]
    password: Annotated[str, Field(...,min_length=6,description="user password")]