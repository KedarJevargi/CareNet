from pydantic import BaseModel



class SendChat(BaseModel):
    msg:str