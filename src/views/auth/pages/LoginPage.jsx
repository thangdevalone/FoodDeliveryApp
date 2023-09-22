import React, { useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

function LoginPage() {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // Handle login logic here
    console.log(data);
  };

  return (
    <View >
      <Text>Login</Text>
      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            
            placeholder="Username"
            onChangeText={(text) => field.onChange(text)}
            value={field.value}
          />
        )}
        name="username"
        defaultValue=""
      />
      {errors?.username && <Text style={styles.error}>{errors.username.message}</Text>}

      <Controller
        control={control}
        render={({ field }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={(text) => field.onChange(text)}
            value={field.value}
            secureTextEntry
          />
        )}
        name="password"
        defaultValue=""
      />
      {errors?.password && <Text style={styles.error}>{errors.password.message}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}


export default LoginPage;
