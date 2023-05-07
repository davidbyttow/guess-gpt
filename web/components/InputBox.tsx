import React, { forwardRef } from "react";
import { Input, Box, HStack, Button } from "@chakra-ui/react";

const InputBox = forwardRef<HTMLInputElement, any>(
  (
    {
      inputMessage,
      onInputChange,
      isLoading = false,
      onSubmit,
      onKeyDown = (e) => {},
      placeholder = "",
      submitButtonText = "Send",
    },
    ref
  ) => {
    return (
      <Box
        p={2}
        borderWidth={1}
        borderRadius="sm"
        boxShadow="lg"
        backgroundColor="white"
        width="100%"
      >
        <HStack>
          <Input
            ref={ref}
            p={0}
            placeholder={placeholder}
            variant="outline"
            size="sm"
            borderWidth={0}
            borderRadius={0}
            isDisabled={isLoading}
            value={inputMessage}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            _focus={{ boxShadow: "none" }}
          />
          <Button
            colorScheme="whatsapp"
            size="sm"
            type="submit"
            borderRadius={2}
            onClick={onSubmit}
            isDisabled={isLoading}
            isLoading={isLoading}
          >
            {submitButtonText}
          </Button>
        </HStack>
      </Box>
    );
  }
);

export default InputBox;
